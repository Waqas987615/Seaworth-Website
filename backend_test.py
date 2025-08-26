import requests
import sys
import json
from datetime import datetime

class SEAWorthTradersAPITester:
    def __init__(self, base_url="https://global-procurement.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else self.api_url
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"   Status Code: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)}")
                    return True, response_data
                except:
                    print(f"   Response: {response.text}")
                    return True, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error Response: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"   Error Response: {response.text}")
                return False, {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test("Root API Endpoint", "GET", "", 200)

    def test_create_inquiry(self, name, email, subject, message):
        """Test creating a new inquiry"""
        inquiry_data = {
            "name": name,
            "email": email,
            "subject": subject,
            "message": message
        }
        return self.run_test("Create Inquiry", "POST", "inquiries", 200, data=inquiry_data)

    def test_get_inquiries(self):
        """Test getting all inquiries"""
        return self.run_test("Get All Inquiries", "GET", "inquiries", 200)

    def test_get_inquiries_count(self):
        """Test getting inquiries count"""
        return self.run_test("Get Inquiries Count", "GET", "inquiries/count", 200)

    def test_invalid_inquiry(self):
        """Test creating inquiry with invalid data"""
        invalid_data = {
            "name": "",
            "email": "invalid-email",
            "subject": "",
            "message": ""
        }
        return self.run_test("Create Invalid Inquiry", "POST", "inquiries", 422, data=invalid_data)

def main():
    print("🚀 Starting SEA WORTH TRADERS API Testing...")
    print("=" * 60)
    
    # Setup
    tester = SEAWorthTradersAPITester()
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    # Test 1: Root endpoint
    print("\n📋 TEST 1: Root API Endpoint")
    tester.test_root_endpoint()

    # Test 2: Get initial inquiries count
    print("\n📋 TEST 2: Get Initial Inquiries Count")
    success, initial_count_data = tester.test_get_inquiries_count()
    initial_count = initial_count_data.get('count', 0) if success else 0
    print(f"   Initial inquiries count: {initial_count}")

    # Test 3: Create a valid inquiry
    print("\n📋 TEST 3: Create Valid Inquiry")
    test_inquiry = {
        "name": f"Test User {timestamp}",
        "email": f"test_{timestamp}@example.com",
        "subject": "Test Inquiry for API Testing",
        "message": "This is a test inquiry created during automated testing of the SEA WORTH TRADERS API."
    }
    
    success, inquiry_response = tester.test_create_inquiry(
        test_inquiry["name"],
        test_inquiry["email"], 
        test_inquiry["subject"],
        test_inquiry["message"]
    )

    # Test 4: Get all inquiries
    print("\n📋 TEST 4: Get All Inquiries")
    success, inquiries_data = tester.test_get_inquiries()
    if success and isinstance(inquiries_data, list):
        print(f"   Found {len(inquiries_data)} inquiries")
        if len(inquiries_data) > 0:
            print(f"   Latest inquiry: {inquiries_data[0].get('name', 'Unknown')} - {inquiries_data[0].get('subject', 'No subject')}")

    # Test 5: Verify count increased
    print("\n📋 TEST 5: Verify Inquiries Count Increased")
    success, final_count_data = tester.test_get_inquiries_count()
    final_count = final_count_data.get('count', 0) if success else 0
    print(f"   Final inquiries count: {final_count}")
    
    if final_count > initial_count:
        print("✅ Count increased correctly after creating inquiry")
        tester.tests_passed += 1
    else:
        print("❌ Count did not increase as expected")
    tester.tests_run += 1

    # Test 6: Test invalid inquiry (should fail validation)
    print("\n📋 TEST 6: Test Invalid Inquiry Data")
    tester.test_invalid_inquiry()

    # Print final results
    print("\n" + "=" * 60)
    print("📊 FINAL TEST RESULTS")
    print("=" * 60)
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("\n🎉 ALL TESTS PASSED! Backend API is working correctly.")
        return 0
    else:
        print(f"\n⚠️  {tester.tests_run - tester.tests_passed} TEST(S) FAILED. Please check the issues above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())