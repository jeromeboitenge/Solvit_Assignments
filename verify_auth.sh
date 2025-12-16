#!/bin/bash

# Ensure server is running or wait for it (manual step or assumed running)
# We will assume server is running on port 5500 for this script

EMAIL="test$(date +%s)@example.com"
PASSWORD="TestPassword123d"
WRONG_PASSWORD="WrongPassword123d"

echo "--- A. Registering User ($EMAIL) ---"
REGISTER_RES=$(curl -s -w "\n%{http_code}" -X POST http://localhost:5500/api/v1/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"TestUser\",\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"gender\":\"Male\"}")

REGISTER_BODY=$(echo "$REGISTER_RES" | head -n 1)
REGISTER_CODE=$(echo "$REGISTER_RES" | tail -n 1)

echo "Response Body: $REGISTER_BODY"
echo "Status Code: $REGISTER_CODE"

if [ "$REGISTER_CODE" != "200" ] && [ "$REGISTER_CODE" != "201" ]; then
  echo "Registration failed. Aborting."
  echo "Debug: maybe server is not running or regex failed?"
  exit 1
fi

echo -e "\n--- B. Logging in with INVALID Password ---"
LOGIN_WRONG_RES=$(curl -s -w "\n%{http_code}" -X POST http://localhost:5500/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$WRONG_PASSWORD\"}")

LOGIN_WRONG_BODY=$(echo "$LOGIN_WRONG_RES" | head -n 1)
LOGIN_WRONG_CODE=$(echo "$LOGIN_WRONG_RES" | tail -n 1)

echo "Response Body: $LOGIN_WRONG_BODY"
echo "Status Code: $LOGIN_WRONG_CODE"

if [ "$LOGIN_WRONG_CODE" == "200" ]; then
  echo "CRITICAL FAILURE: Login Succeeded with Wrong Password!"
  exit 1
elif [ "$LOGIN_WRONG_CODE" == "400" ]; then
  echo "SUCCESS: Login Rejected as expected."
else
  echo "WARNING: Unexpected status code $LOGIN_WRONG_CODE (Expected 400)"
  # It might still be success if not 200?
fi

echo -e "\n--- C. Logging in with VALID Password ---"
LOGIN_CORRECT_RES=$(curl -s -w "\n%{http_code}" -X POST http://localhost:5500/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

LOGIN_CORRECT_BODY=$(echo "$LOGIN_CORRECT_RES" | head -n 1)
LOGIN_CORRECT_CODE=$(echo "$LOGIN_CORRECT_RES" | tail -n 1)

echo "Response Body: $LOGIN_CORRECT_BODY"
echo "Status Code: $LOGIN_CORRECT_CODE"

if [ "$LOGIN_CORRECT_CODE" == "200" ]; then
  echo "SUCCESS: valid login worked."
else
  echo "FAILURE: valid login failed."
  exit 1
fi
