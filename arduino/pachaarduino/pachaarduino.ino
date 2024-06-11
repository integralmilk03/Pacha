#include <Arduino.h>
#include <WiFi.h> 
#include <FirebaseESP32.h>
// Provide the token generation process info.
#include <addons/TokenHelper.h>

// Provide the RTDB payload printing info and other helper functions.
#include <addons/RTDBHelper.h>

#define WIFI_SSID "AXS_2.4G_MC6evP"
#define WIFI_PASSWORD "g3aRhaha"

#define DATABASE_URL "https://pacha-oficial-default-rtdb.firebaseio.com/"
#define API_KEY "AIzaSyDVIY_jIUE-s5oudL2sd7DwvLMKa3NcTFA"

//FirebaseData firebaseData;
//FirebaseJson json;
/* 4. Define the user Email and password that alreadey registerd or added in your project */
#define USER_EMAIL "samu28n04@gmail.com"
#define USER_PASSWORD "12345abcd"

// Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;

unsigned long count = 0;

int trig = 12;
int eco = 13;
float tiempo;
float distancia;

void setup(){
  pinMode(trig, OUTPUT);
  pinMode(eco, INPUT);
  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the user sign in credentials */
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

  // Comment or pass false value when WiFi reconnection will control by your code or third party library e.g. WiFiManager
  Firebase.reconnectNetwork(true);

  // Since v4.4.x, BearSSL engine was used, the SSL buffer need to be set.
  // Large data transmission may require larger RX buffer, otherwise connection issue or data read time out can be occurred.
  fbdo.setBSSLBufferSize(4096, 1024);

  Firebase.begin(&config, &auth);

  Firebase.setDoubleDigits(5);

}

void loop(){
  digitalWrite(trig, HIGH);
  delay(1);
  digitalWrite(trig, LOW);

  tiempo = pulseIn(eco, HIGH);
  distancia = tiempo/58.3;

  Serial.println(distancia);
  Serial.print(" °C\t");
  FirebaseJson json;

  //}
  json.set("/temp", distancia);
  Serial.printf("Set json... %s\n", Firebase.set(fbdo, F("/"), json) ? "ok" : fbdo.errorReason().c_str());
  delay(1000);
}
