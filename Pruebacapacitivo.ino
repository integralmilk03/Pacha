//--------------------------------------------Librerias-------------------------------------------------------
#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <EEPROM.h>
#include <ArduinoJson.h>
//#include <TimeLib.h>
#include <TFT_eSPI.h>
#include <SPI.h>
#include <esp_task_wdt.h>
#include "expressions.h"
#include <DHT12.h>
#include <Adafruit_NeoPixel.h>


#define EEPROM_SIZE 512
#define SSID_ADDR 0
#define PASSWORD_ADDR 32
#define USER_ID_ADDR 64
// BLE Service and Characteristics UUIDs
#define SERVICE_UUID "3c795e44-4c2d-4eea-9f2b-aa4732fe4c52"
#define CHARACTERISTIC_UUID "c013c029-035d-4549-9ede-468cda5947ba"
// URL de la API
const char* serverName = "https://django-render-pacha-web.onrender.com/users/usuario/";

DHT12 dht12;

// Wi-Fi credentials received via BLE
String ssid = "";
String password = "";
String userId = "";

bool newCredentials = false;
unsigned long lastSendTime = 0; // Variable para almacenar el último tiempo de envío
const unsigned long sendInterval = 17000; // Intervalo de envío en milisegundos (10 segundos)
int lastActivationMinute = -1;

// Variables para reemplazar delays
unsigned long lastReconnectAttempt = 0;
const unsigned long reconnectInterval = 1000;
unsigned long lastTrigTime = 0;
const unsigned long trigInterval = 1;
int previousExpresion = 0;

#define led        16  //Luces LED
#define PinUV      35
#define PinLDR     32
#define PinCapacitivo 33
#define PinNivel 34
#define NUMPIXELS  21

int uvIntensity = 0;
int LDRIntensity = 0;
int CtvIntensity = 0;
int LvlPercentage = 0;
int Bomba = 17;
int boton = 26;
int buzzerPin = 27;
int melody[] = {
  262, 294, 330, 349, 392, 440, 494, 523
};

//int actriego = 0;
int buttonState = 0;            // Estado actual del botón
int lastButtonState = HIGH;     // Estado previo del botón (suponiendo que el botón no está presionado al inicio)
int relayState = LOW;           // Estado actual del rele

// Variables para la gestión de tiempo
unsigned long lastDebounceTime = 0; // Tiempo del último cambio de estado
unsigned long debounceDelay = 50;   // Retraso de rebote (50 ms)
unsigned long pumpStartTime = 0;    // Tiempo en que se inició la bomba
unsigned long buttonPressTime = 0;  // Tiempo en que se presionó el botón
unsigned long waitBeforePump = 2000;// Tiempo de espera antes de encender la bomba (2000 ms = 2 segundos)
unsigned long maxButtonPressDuration = 5000; // Máxima duración de la presión del botón (5000 ms = 5 segundos)
// Variables para gestionar el estado del botón después de soltarlo
unsigned long buttonReleaseTime = 0;
unsigned long buttonReleaseDuration = 2000; // Duración de tiempo después de soltar el botón (8000 ms = 8 segundos)
unsigned long faceChangeStartTime = 0; // Tiempo en que se cambió la cara
unsigned long faceDisplayDuration = 5000; 
bool buttonHeld = false;
bool faceChanged = false;

Adafruit_NeoPixel pixels(NUMPIXELS, led, NEO_GRB + NEO_KHZ800);
TFT_eSPI tft = TFT_eSPI();



// Variables para almacenar los datos recibidos de la base de datos
int riego = 0;
int solhoras = 0;
int expresion = 0;
int tempExt = 0;
int humInt = 0;
float humExt = 0.0;
int luzUV = 0;
int luz = 0;
int nivel = 0;
int modo = 0;
int diariego = 0;
int fechariego = 0;
String horariego = "";
bool datewaterstart = false;
// Variables para almacenar la hora y los minutos especificados por el usuario
int userHour = 0;
int userMinute = 0;

// Variables para controlar el tiempo de activación del relé
bool relayActive = false;
bool relayActivatedToday = false;
unsigned long relayActivationTime = 0;
const unsigned long relayDuration = 5000; // Duración en milisegundos (5 segundos)

// Función para obtener y mostrar la hora local
void printLocalTime() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return;
  }
  Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
}

// Función para comprobar si es el momento de activar el relé
bool shouldActivateRelay() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return false;
  }

  // Obtener la hora y los minutos actuales
  int currentHour = timeinfo.tm_hour;
  int currentMinute = timeinfo.tm_min;

  // Comparar con la hora y los minutos especificados por el usuario
  if (currentHour == userHour && currentMinute == userMinute && !relayActivatedToday) {
    return true;
  }
  
  return false; // No activar el relé (devolver falso)
}


//Función para conectar a Wi-Fi
void connectToWiFi(const String& ssid, const String& password) {
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(ssid.c_str(), password.c_str());
  unsigned long startAttemptTime = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 20000) {
    if (millis() - startAttemptTime >= 500) {
      Serial.print(".");
      startAttemptTime += 500;
    }
  }
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConnected to Wi-Fi network!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nNo se pudo conectar a Wi-Fi, por favor verificar credenciales.");
  }
  
}

//Funciones para Bluetooth
// BLE Server callbacks
class MyServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    Serial.println("Device connected");
  }

  void onDisconnect(BLEServer* pServer) {
    Serial.println("Device disconnected");
  }
};

// BLE Characteristic callbacks
class MyCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    std::string value = pCharacteristic->getValue();
    if (value.length() > 0) {
      ssid = "";
      password = "";
      userId = "";

      // Buscar la primera coma para el SSID
      int firstCommaIndex = value.find(",");
      // Buscar la segunda coma para la contraseña
      int secondCommaIndex = value.find(",", firstCommaIndex + 1);
      
      if (firstCommaIndex != -1 && secondCommaIndex != -1) {
        // Extraer SSID, password y userId desde el valor recibido
        ssid = String(value.substr(0, firstCommaIndex).c_str());
        password = String(value.substr(firstCommaIndex + 1, secondCommaIndex - firstCommaIndex - 1).c_str());
        userId = String(value.substr(secondCommaIndex + 1).c_str());

        //Se obtuvieron las credenciales
        newCredentials = true;
        Serial.println("Las credenciales de Wi-Fi a través de Bluetooth son:");
        Serial.print("SSID: ");
        Serial.println(ssid);
        Serial.print("Password: ");
        Serial.println(password);
        Serial.print("User ID: ");
        Serial.println(userId);

        // Guardar las credenciales en EEPROM
        EEPROM.writeString(SSID_ADDR, ssid);
        EEPROM.writeString(PASSWORD_ADDR, password);
        EEPROM.writeString(USER_ID_ADDR, userId);
        EEPROM.commit();
        Serial.println("Se guardaron las credenciales nuevas en EEPROM");
      }
    }
  }
};

void setup() {
  Serial.begin(115200);
  
  pinMode(Bomba, OUTPUT);
  digitalWrite(Bomba, LOW); // Asegurarse de que el relé esté apagado al inicio

  dht12.begin();
  tft.init();
  tft.setRotation(3);
  tft.fillScreen(0x0000);
  pixels.begin();
  pixels.clear();
  delay(10);
  tira_led(0,0,0);
  int h = 240,w = 320, row, col, buffidx=0;
  for (row=0; row<h; row++) { // For each scanline...
    for (col=0; col<w; col++) { // For each pixel...
      //To read from Flash Memory, pgm_read_XXX is required.
      //Since image is stored as uint16_t, pgm_read_word is used as it uses 16bit address
      tft.drawPixel(col, row, pgm_read_word(evive_in_hand + buffidx));
      buffidx++;
    } // end pixel
  }
  delay(2000);
  tft.fillScreen(0x0000);
  tira_led(255,255,255);
  turn_on();
  face_static();
  activateBLE();

   // Configurar el pin del botón como entrada con resistencia de pull-up interna
  pinMode(boton, INPUT_PULLUP);

  // Initialize EEPROM
  EEPROM.begin(EEPROM_SIZE);
  // Leer credenciales y id del usuario de EEPROM
  ssid = EEPROM.readString(SSID_ADDR);
  password = EEPROM.readString(PASSWORD_ADDR);
  userId = EEPROM.readString(USER_ID_ADDR);

  if (ssid.length() == 0 || password.length() == 0) {
    Serial.println("No se encuentran datos ssid y password anteriores, ingrese por favor");
  } else {
    Serial.println("Las credenciales de Wi-Fi encontradas en la EEPROM son:");
    Serial.print("SSID: ");
    Serial.println(ssid);
    Serial.print("Password: ");
    Serial.println(password);
    Serial.print("User ID: ");
    Serial.println(userId);
    connectToWiFi(ssid, password);
  }
}

void loop() {
  //delay(1000);
  unsigned long currentTime = millis();
  if (newCredentials) {
    if (currentTime - lastReconnectAttempt >= reconnectInterval) {
      Serial.println("Reconnecting to Wi-Fi with new credentials...");
      WiFi.disconnect();
      connectToWiFi(ssid, password);
      lastReconnectAttempt = currentTime;
      // Reset newCredentials flag
      newCredentials = false;
    }
  }

  if (WiFi.status() == WL_CONNECTED) {
    // Inicializar y configurar NTP
    configTime(-4 * 3600, 0, "pool.ntp.org", "time.nist.gov");

    // Esperar hasta obtener la hora
    //printLocalTime();

    if (currentTime - lastSendTime >= sendInterval) {
      lastSendTime = currentTime;

      uvIntensity = analogRead(PinUV);
      LDRIntensity = analogRead(PinLDR);
      CtvIntensity = analogRead(PinCapacitivo);
      LvlPercentage  = analogRead(PinNivel);
      float t12 = dht12.readTemperature(); //-20°C a 60°C
      float h12 = dht12.readHumidity(); // 20% a 95% 
      expresion = 3;//"cara_happy";
      
      if (uvIntensity > 4000 && h12 > 4000 && h12 < 4090) {
        expresion = 2;//"cara_triste";
       
      } else if (uvIntensity > 4000 || t12 >30) {
        expresion = 1;//"cara_calor";
      
      } else if (t12 < 10) {
        expresion = 4;//"cara_frio";
      } else if (CtvIntensity <= 1200) {
        expresion = 5;//"cara_mucha_agua";
      } else if (CtvIntensity > 4000 && CtvIntensity < 4090) {
        expresion = 6;//"cara_sedienta";
      
      } else if (uvIntensity == 0 && luz < 10) {
        expresion = 7;//"cara_oscuro";
      }
      caras();
      delay(10);

      //controlWaterPump(); 

      float porcentajeUV = map(uvIntensity, 0, 4095, 0, 100);
      float porcentajeLDR = map(LDRIntensity, 0, 4095, 0, 100);
      float porcentajeCtv = map(CtvIntensity, 4095, 1500, 0, 100);
      float porcentajeLvl = map(LvlPercentage, 1600, 4095, 0, 100);
// AQUI SE EMPIEZAN A ENVIAR LOS DATOS
      HTTPClient http;
      String serverPath = serverName + String(userId) + "/"; // URL para el usuario específico
      http.begin(serverPath);
      http.addHeader("Content-Type", "application/json");

      String httpRequestData = "{\"expresion\":\"" + String(expresion) + "\","
                              "\"tempExt\":\"" + String(t12) + "\","
                              "\"humInt\":\"" + String(porcentajeCtv) + "\","
                              "\"humExt\":\"" + String(h12) + "\","
                              "\"luzUV\":\"" + String(porcentajeUV) + "\","
                              "\"luz\":\"" + String(porcentajeLDR) + "\","
                              "\"nivel\":\"" + String(porcentajeLvl) + "\"}";
      int httpResponseCode = http.PATCH(httpRequestData); // Usar método PATCH para actualizar

      if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.println(httpResponseCode);
        Serial.println(response);
        // AQUI SE LEEN LOS DATOS DE LA BASE Y SE LAS GUARDA EN VARIABLES
        if (httpResponseCode == 200 || httpResponseCode == 201) {
          http.begin(serverPath);
          int httpGetResponseCode = http.GET();

          if (httpGetResponseCode > 0) {
            String payload = http.getString();
            Serial.println(payload);
            StaticJsonDocument<1024> doc;
            DeserializationError error = deserializeJson(doc, payload);

            if (!error) {
              riego = doc["riego"].as<int>();
              solhoras = doc["solhoras"].as<int>();
              expresion = doc["expresion"].as<int>();
              tempExt = doc["tempExt"].as<int>();
              humInt = doc["humInt"].as<int>();
              humExt = doc["humExt"].as<float>();
              luzUV = doc["luzUV"].as<int>();
              luz = doc["luz"].as<int>();
              nivel = doc["nivel"].as<int>();
              modo = doc["modo"].as<int>();
              String horariego = doc["horariego"].as<String>();
              diariego = doc["diariego"].as<int>();
              // Separar la hora y los minutos de horariego
              int separatorIndex = horariego.indexOf(':');
              userHour = horariego.substring(0, separatorIndex).toInt();
              userMinute = horariego.substring(separatorIndex + 1).toInt();

              // Imprimir valores leídos
              Serial.print("Riego: ");
              Serial.println(riego);
              Serial.print("Horas de sol: ");
              Serial.println(solhoras);
              Serial.print("Expresion: ");
              Serial.println(expresion);
              Serial.print("Temperatura externa: ");
              Serial.println(tempExt);
              Serial.print("Humedad interna: ");
              Serial.println(humInt);
              Serial.print("Humedad externa: ");
              Serial.println(humExt);
              Serial.print("Luz UV: ");
              Serial.println(luzUV);
              Serial.print("Luz: ");
              Serial.println(luz);
              Serial.print("Nivel: ");
              Serial.println(nivel);
              Serial.print("Modo: ");
              Serial.println(modo);
              Serial.print("Hora de Riego: ");
              Serial.print(horariego);
              Serial.print("Dia de Riego: ");
              Serial.print(diariego);
              printLocalTime();
              if (modo == 0){
                // Comprobar si es el momento de activar el relé
                if (shouldActivateRelay() && !relayActive) {
                  relayActive = true;
                  relayActivatedToday = true; // Marcar que el relé ha sido activado hoy
                  relayActivationTime = millis(); // Guardar el tiempo de activación
                  digitalWrite(Bomba, HIGH); // Activar el relé
                  Serial.println("Relay activated!");
                  
                  // Obtener el minuto actual
                  struct tm timeinfo;
                  if (getLocalTime(&timeinfo)) {
                    lastActivationMinute = timeinfo.tm_min;
                  }
                  delay(1500);
                  relayActive = false;
                  digitalWrite(Bomba, LOW); // Desactivar el relé
                  Serial.println("Relay deactivated!");
                  //relayActivationTime = 0;
                  
                }

                // Comprobar si ha pasado el tiempo de duración del relé
                //if (relayActive && millis() - relayActivationTime >= relayDuration) {
                  // relayActive = false;
                  // digitalWrite(Bomba, LOW); // Desactivar el relé
                  // Serial.println("Relay deactivated!");
                  // relayActivationTime = 0;
                  //relayActivatedToday = false;
                //}

                // Restablecer la bandera al día siguiente
                struct tm timeinfo;
                if (getLocalTime(&timeinfo) && relayActivatedToday) {
                  if (timeinfo.tm_min != lastActivationMinute) {
                    relayActivatedToday = false;
                    Serial.println("Relay can be activated again");
                  }
                }
              } else if (modo == 1) {
                // Leer el estado del botón
                buttonState = digitalRead(boton);

                // Si el botón está presionado (estado LOW), activar la bomba
                if (buttonState == LOW) {
                  digitalWrite(Bomba, HIGH); // Activar el relé (bomba encendida)
                  delay(1500);
                  digitalWrite(Bomba, LOW);
                  //Serial.println("Bomba activada!");
                } 
                //int reading = digitalRead(boton);
                //if (riego == 1){
                  // HTTPClient http;
                  // int actriego = 0;
                  // //int userId = 1; // Asume que el ID del usuario es 1, cambia esto según sea necesario

                  // // Construir la ruta del servidor
                  // String serverPath = serverName + String(userId) + "/"; // URL para el usuario específico
                  // Serial.println("Server Path: " + serverPath); // Depuración: Verifica la URL

                  // // Iniciar conexión HTTP
                  // http.begin(serverPath);

                  // // Añadir header
                  // http.addHeader("Content-Type", "application/json");

                  // // Crear el JSON correctamente
                  // String httpRequestData = "{\"riego\":" + String(actriego) + "}";
                  // Serial.println("HTTP Request Data: " + httpRequestData); // Depuración: Verifica el JSON

                  // // Enviar solicitud PATCH
                  // int httpResponseCode = http.PATCH(httpRequestData);
                  
                  // float actriego=0;
                  // String httpRequestData = "{\"riego\":\"" + String(actriego) + "\"}";
                  // int httpResponseCode = http.PATCH(httpRequestData);
                  // if (httpResponseCode > 0) {
                  //   String response = http.getString();
                  //   Serial.println(httpResponseCode);
                  //   Serial.println(response);
                  // }
                //   digitalWrite(Bomba, HIGH);
                //   delay(2000);
                //   digitalWrite(Bomba, LOW);
                // }
                              // Si el estado del botón ha cambiado
                // if (reading != lastButtonState) {
                //   // Reiniciar el temporizador de rebote
                //   lastDebounceTime = millis();
                // }

                // // Si el estado ha permanecido estable durante el retraso de rebote
                // if ((millis() - lastDebounceTime) > debounceDelay) {
                //   // Si el estado del botón ha cambiado
                //   if (reading != buttonState) {
                //     buttonState = reading;

                //     // Si el botón está presionado
                //     if (buttonState == LOW) {
                //       buttonPressTime = millis(); // Guardar el tiempo en que se presionó el botón
                //       buttonHeld = true;
                  
                //     } else { // Si el botón está soltado
                //       buttonReleaseTime = millis(); // Guardar el tiempo en que se soltó el botón
                //       buttonHeld = false;
                //     }
                //   }
                // }

                // Si el botón está presionado y el tiempo de presión supera los 5 segundos
                // if (buttonHeld && (millis() - buttonPressTime > maxButtonPressDuration)) {
                //   Serial.println("Cara ahogada");
                //   for (int i =0;i<=NUMPIXELS;i++){
                //     pixels.setPixelColor(i, pixels.Color(222, 209, 0));
                //     pixels.show();
                //   }
                //   face_static();
                //   cambio_mucha_agua();
                //   mucha_agua();
                //   faceChanged = true;
                //   faceChangeStartTime = millis();
                //   //delay(5000);
                //   buttonHeld = false; // Resetear el estado de presión del botón
                // }

                // // Si el botón ha sido soltado y han pasado 8 segundos desde entonces
                // if (!buttonHeld && (millis() - buttonReleaseTime > buttonReleaseDuration)) {
                //   Serial.println("Cara feliz");
                //   for (int i =0;i<=NUMPIXELS;i++){
                //     pixels.setPixelColor(i, pixels.Color(222, 209, 0));
                //     pixels.show();
                //   }
                //   face_static();
                //   cambio_happy();
                //   happy();
                //   faceChanged = true;
                //   faceChangeStartTime = millis();
                //   //delay(5000);
                // }
                // // Si la cara ha sido cambiada y han pasado 5 segundos
                // if (faceChanged && (millis() - faceChangeStartTime > faceDisplayDuration)) {
                //   faceChanged = false; // Resetear el estado de la cara cambiada
                //   face_static(); // Volver a la cara estática
                // }
                
                //               // Si el botón está presionado y ha pasado el tiempo de espera antes de encender la bomba
                // if (buttonHeld && (millis() - buttonPressTime >= waitBeforePump)) {
                //   relayState = HIGH;
                //   pumpStartTime = millis(); // Guardar el tiempo de inicio de la bomba
                // }

                // // Si la bomba está encendida y el tiempo de presión del botón supera los 5 segundos
                // if (relayState == HIGH && (millis() - pumpStartTime >= maxButtonPressDuration)) {
                //   relayState = LOW; // Apagar la bomba
                // }

                // // Establecer el estado del relé
                // digitalWrite(Bomba, relayState);

                // // Guardar el estado actual del botón
                // lastButtonState = reading;
              }
            } else {
              Serial.print("JSON parse error: ");
              Serial.println(error.c_str());
            }
          } else {
            Serial.print("Error en la petición GET: ");
            Serial.println(httpGetResponseCode);
          }

          http.end();
        }
      } else {
        Serial.print("Error en la petición: ");
        Serial.println(httpResponseCode);
      }

      http.end();
    }
  } else {
    if (currentTime - lastReconnectAttempt >= reconnectInterval) {
      Serial.println("Wi-Fi not connected. Activating BLE...");
      lastReconnectAttempt = currentTime;
    }
  }
}

void activateBLE() {
  // Initialize BLE
  BLEDevice::init("Pacha"); //Inicializa el dispositivo BLE con nombre de "Pacha"
  BLEServer *pServer = BLEDevice::createServer(); //Crea un servidor BLE
  pServer->setCallbacks(new MyServerCallbacks()); //Establece devoluciones de llamada del servidor BLE

  BLEService *pService = pServer->createService(SERVICE_UUID); //Crea un servicio BLE con el UUID especificado
  BLECharacteristic *pCharacteristic = pService->createCharacteristic( //Crea una característica BLE con el UUID específicado y las propiedades añadidas
    CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ   |
    BLECharacteristic::PROPERTY_WRITE  |
    BLECharacteristic::PROPERTY_NOTIFY |
    BLECharacteristic::PROPERTY_INDICATE
  );

  pCharacteristic->setCallbacks(new MyCallbacks()); //Establece las devoluciones de la llamada para la característica BLE
  pCharacteristic->addDescriptor(new BLE2902()); //Añade un descriptor a la característica BLE
  pService->start(); //Inicia el servicio BLE

  pServer->getAdvertising()->start(); //Comienza a anunciar el servicio BLE
  Serial.println("Waiting for a client connection to notify..."); //Imprime un mensaje indicando que está esperando una conexión
}

void caras(){
    unsigned long currentMillis = millis();

      if (expresion != previousExpresion) {
        face_static();

        previousExpresion = expresion;

        switch (expresion) {
           
          case 1:
            tira_led(255,85,0);
            cambio_calor();
            break;
          case 2:
            tira_led(0,0,255);
            cambio_triste();
            break;
          case 3:
            tira_led(255,255,0);
            cambio_happy();
            break;
          case 4:
            tira_led(0,255,255);
            cambio_frio();
            break;
          case 5:
            tira_led(102,0,204);
            cambio_mucha_agua();
            break;
          case 6:
            tira_led(255,51,255);
            cambio_sedienta();
            break;
          case 7:
            tira_led(255,0,0);
            cambio_oscuro();
            break;
          case 8:
            tira_led(0,204,0);
            cambio_random();
            break;
        }
      }

      switch (expresion) {
        case 1:
          calor();
          break;
        case 2:
          triste();
          break;
        case 3:
          happy();
          break;
        case 4:
          cambio_frio();
          break;
        case 5:
          mucha_agua();
          break;
        case 6:
          sedienta();
          break;
        case 7:
          oscuro();
          break;
        case 8:
          cambio_random();
          break;   
  }
}


void tira_led(int r, int g, int b){
  for (int i = 0;i<=NUMPIXELS;i++){
      pixels.setPixelColor(i, pixels.Color(r, g, b));
      pixels.show();
    }
}