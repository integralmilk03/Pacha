#include <TFT_eSPI.h>
#include "expressions.h"

extern TFT_eSPI tft;



//--------------------------------------------------------------------------CALOR---------------------------------------------------------------------
void cambio_calor(){
  for (int i = 0; i <=150; i++){
    //tft.drawSmoothArc(160, 150, 50, 25, 270, 90, 0XFFFF, 0x0000, true);
    tft.fillTriangle(-10,-50+i, 140,-80+i, 10,10, TFT_BLACK);
    tft.fillTriangle(330,-50+i, 180,-80+i, 310,10, TFT_BLACK);
    if(i ==  100){
      tft.fillEllipse(160, 180, 80, 80, 0x0000);
      tft.drawSmoothArc(160, 180, 50, 25, 90, 270, 0XFFFF, 0x0000, true);
      tft.fillEllipse(160, 180, 50, 50, 0XFFFF);
      tft.fillRoundRect(110, 180, 110, 51, 0, 0X0000);
    }
    
    delay(5);
  }
  delay(1000);
}
void calor(){
  unsigned long ultimo_tiempo = 0;
  unsigned long ultimo_tiempo2 = 0;
  const unsigned long intervalo = 3000;
  const unsigned long intervalo2 = 3000;
  unsigned long tiempo_actual1 = 0;
  unsigned long tiempo_actual2 = 0;
  
  int seg = 0;
  int i = 0, j = 0, k = 0, m = 0;
  int x1 = random(13,73);
  int y1 = random(34,50);
  int x2 = random(100,155);
  int y2 = random(34,55);
  int x3 = random(165,220);
  int y3 = random(34,55);
  int x4 = random(247,307);
  int y4= random(34,50);
  int esta = 1;
  int xc = 0, yc = 0;
  int vari = 0;


  while (esta < 5){
    tiempo_actual1 = millis();
    if (tiempo_actual1 - 1500 >= 1500){
      tiempo_actual2 = millis();
    }
    //gotas
    //int xc = 38;
    //int yc = 41;
    if (tiempo_actual1 - ultimo_tiempo >= intervalo){
      xc = x1;
      yc = y1;
      i+1;
      tft.fillTriangle(xc-7 ,(yc-2 )-150+i, xc-13, (yc-29)-150+i, xc+2, (yc-19)-150+i, TFT_BLACK);
      tft.fillTriangle(xc+12,(yc-32)-150+i, xc+7 , (yc-1 )-150+i, xc  , (yc-19)-150+i, TFT_BLACK);
      tft.fillTriangle(xc-7 ,(yc-2 )-150+i, xc+7 , (yc+1 )-150+i, xc  , (yc-19)-150+i, TFT_BLACK);
      tft.fillEllipse(xc, yc-150+i, 8,8, TFT_BLACK);

      xc = x3;
      yc = y3;
      m+1;
      tft.fillTriangle(xc-7 ,(yc-2 )-150+m, xc-13, (yc-29)-150+m, xc+2, (yc-19)-150+m, TFT_BLACK);
      tft.fillTriangle(xc+12,(yc-32)-150+m, xc+7 , (yc-1 )-150+m, xc  , (yc-19)-150+m, TFT_BLACK);
      tft.fillTriangle(xc-7 ,(yc-2 )-150+m, xc+7 , (yc+1 )-150+m, xc  , (yc-19)-150+m, TFT_BLACK);
      tft.fillEllipse(xc, yc-150+m, 8,8, TFT_BLACK);

      //tft.fillEllipse(xc, (yc-150+i)-8, 22, 22, TFT_BLACK);

      x1 = random(13,73);
      y1 = random(34,55);
      x3 = random(165,220);
      y3 = random(34,55);
      i = 0;
      m = 0;
      ultimo_tiempo = tiempo_actual1;
    }
    if (tiempo_actual2 - ultimo_tiempo2 >= intervalo2){
      xc = x2;
      yc = y2;
      j+1;
      k+1;
      tft.fillTriangle(xc-7 ,(yc-2 )-150+j, xc-13, (yc-29)-150+j, xc+2, (yc-19)-150+j, TFT_BLACK);
      tft.fillTriangle(xc+12,(yc-32)-150+j, xc+7 , (yc-1 )-150+j, xc  , (yc-19)-150+j, TFT_BLACK);
      tft.fillTriangle(xc-7 ,(yc-2 )-150+j, xc+7 , (yc+1 )-150+j, xc  , (yc-19)-150+j, TFT_BLACK);
      tft.fillEllipse(xc, yc-150+j, 8, 8, TFT_BLACK);
      x2 = random(100,155);
      y2 = random(34,55);
      j = 0;
      xc = x4;
      yc = y4;
      
      tft.fillTriangle(xc-7 ,(yc-2 )-150+k, xc-13, (yc-29)-150+k, xc+2, (yc-19)-150+k, TFT_BLACK);
      tft.fillTriangle(xc+12,(yc-32)-150+k, xc+7 , (yc-1 )-150+k, xc  , (yc-19)-150+k, TFT_BLACK);
      tft.fillTriangle(xc-7 ,(yc-2 )-150+k, xc+7 , (yc+1 )-150+k, xc  , (yc-19)-150+k, TFT_BLACK);
      tft.fillEllipse(xc, yc-150+k, 8, 8, TFT_BLACK);
      x2 = random(100,155);
      y2 = random(34,55);
      x4 = random(247,307);
      y4= random(34,50);
      
      seg = 0;
      k = 0;
      ultimo_tiempo2 = tiempo_actual2;
      esta = esta +1;
      Serial.println(esta);
      
    }
    
    if (tiempo_actual1 - ultimo_tiempo2 >= 1500){
      seg = 1;
    }
    delay(10);
//    tft.fillTriangle(120,31-150+i, 114,1-150+i , 129,16-150+i, TFT_BLACK);
//    tft.fillTriangle(140,1-150+i , 134,31-150+i, 127,16-150+i , TFT_BLACK);
//    tft.fillTriangle(120,31-150+i, 134,31-150+i, 127,16-150+i, 0x05ff);
//    tft.fillEllipse(127, 33-150+i, 7, 7, 0x05ff);
//  
//    tft.fillTriangle(201,54-150+i, 195,24-150+i, 210,36-150+i , TFT_BLACK);
//    tft.fillTriangle(220,24-150+i, 215,55-150+i, 208,36-150+i , TFT_BLACK);
//    tft.fillTriangle(201,54-150+i, 215,55-150+i, 208,36-150+i, 0x05ff);
//    tft.fillEllipse(208, 56-150+i, 7, 7, 0x05ff);
//  
//    tft.fillTriangle(300,32-150+i , 294,2-150+i , 309,15-150+i , TFT_BLACK);
//    tft.fillTriangle(319,2-150+i , 314,32-150+i , 307,15-150+i , TFT_BLACK);
//    tft.fillTriangle(300,32-150+i, 314,32-150+i , 307,15-150+i, 0x05ff);
//    tft.fillEllipse(307, 34-150+i, 7, 7, 0x05ff);
    if (i <= 150){
      xc = x1;
      yc = y1;
      tft.fillTriangle(xc-7 ,(yc-2 )-150+i, xc-13, (yc-29)-150+i, xc+2, (yc-19)-150+i, TFT_BLACK);
      tft.fillTriangle(xc+12,(yc-32)-150+i, xc+7 , (yc-1 )-150+i, xc  , (yc-19)-150+i, TFT_BLACK);
      tft.fillTriangle(xc-7 ,(yc-2 )-150+i, xc+7 , (yc+1 )-150+i, xc  , (yc-19)-150+i, 0x05ff);
      tft.fillEllipse(xc, yc-150+i, 7, 7, 0x05ff);
      //if (i >= 150){i = 150;}
      i = i+1;
    }
    if (seg = 1 && j <= 150){
      xc = x2;
      yc = y2;
      tft.fillTriangle(xc-7 ,(yc-2 )-150+j, xc-13, (yc-29)-150+j, xc+2, (yc-19)-150+j, TFT_BLACK);
      tft.fillTriangle(xc+12,(yc-32)-150+j, xc+7 , (yc-1 )-150+j, xc  , (yc-19)-150+j, TFT_BLACK);
      tft.fillTriangle(xc-7 ,(yc-2 )-150+j, xc+7 , (yc+1 )-150+j, xc  , (yc-19)-150+j, 0x05ff);
      tft.fillEllipse(xc, yc-150+j, 7, 7, 0x05ff);
      //if (i >= 150){i = 150;}
      j = j+1;
    }
    if (k <= 150){
      xc = x4;
      yc = y4;
      tft.fillTriangle(xc-7 ,(yc-2 )-150+k, xc-13, (yc-29)-150+k, xc+2, (yc-19)-150+k, TFT_BLACK);
      tft.fillTriangle(xc+12,(yc-32)-150+k, xc+7 , (yc-1 )-150+k, xc  , (yc-19)-150+k, TFT_BLACK);
      tft.fillTriangle(xc-7 ,(yc-2 )-150+k, xc+7 , (yc+1 )-150+k, xc  , (yc-19)-150+k, 0x05ff);
      tft.fillEllipse(xc, yc-150+k, 7, 7, 0x05ff);
      //if (i >= 150){i = 150;}
      k = k+1;
    }
    if (seg = 1 && m <= 150){
      xc = x3;
      yc = y3;
      tft.fillTriangle(xc-7 ,(yc-2 )-150+m, xc-13, (yc-29)-150+m, xc+2, (yc-19)-150+m, TFT_BLACK);
      tft.fillTriangle(xc+12,(yc-32)-150+m, xc+7 , (yc-1 )-150+m, xc  , (yc-19)-150+m, TFT_BLACK);
      tft.fillTriangle(xc-7 ,(yc-2 )-150+m, xc+7 , (yc+1 )-150+m, xc  , (yc-19)-150+m, 0x05ff);
      tft.fillEllipse(xc, yc-150+m, 7, 7, 0x05ff);
      //if (i >= 150){i = 150;}
      m = m+1;
    }
  
  }
 
}
//----------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------TRISTE---------------------------------------------------------------------

void triste(){
  //tft.fillScreen(0x0000);
  //tft.fillEllipse(53, 80, 40, 40, 0XFFFF);
  //tft.fillEllipse(267, 80, 40, 40, 0xFFFF);
  //delay(1000);
  
    tft.fillEllipse(20, 10, 70, 70, 0x0000);
    tft.fillEllipse(287, 10, 70, 70, 0x0000);
    
    tft.fillEllipse(160, 180, 80, 80, 0x0000);
    tft.drawSmoothArc(160, 170, 30, 15, 90, 270, 0XFFFF, 0x0000, true);
  
    delay(1);
  
}

void cambio_triste(){
  blink_();
  tft.fillEllipse(53, 80, 40, 40, 0XFFFF);
  tft.fillEllipse(267, 80, 40, 40, 0xFFFF);
  for (int i = 0; i<=35; i++){
    tft.fillRoundRect(120, 173-i, 80, 4,1, TFT_WHITE); 
  }
  tft.drawSmoothArc(160, 150, 50, 25, 360-90, 90, 0XFFFF, 0XFFFF, true);
  delay(10);
  for (int i = 0; i <= 70; i += 1) {
    tft.fillEllipse(20, 10, i, i, 0x0000);
    tft.fillEllipse(287, 10, i, i, 0x0000);
    if(i ==  40){
      tft.fillEllipse(160, 180, 80, 80, 0x0000);
      tft.drawSmoothArc(160, 170, 30, 15, 90, 270, 0XFFFF, 0x0000, true);
      //tft.fillEllipse(160, 180, 50, 50, 0XFFFF);
      //tft.fillRoundRect(110, 180, 110, 51, 0, 0X0000);
    }
    delay(1);
  }
}
//----------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------FELIZ----------------------------------------------------------------------

void happy(){
  tft.fillEllipse(53, 80, 40, 40, 0XFFFF);
  tft.fillEllipse(267, 80, 40, 40, 0xFFFF);
  for (int i = 0; i <= 40; i += 1) {
    tft.fillEllipse(53-7, 80+40, 50, i, 0X0000);
    tft.fillEllipse(267+7, 80+40, 50, i, 0X0000);
    delay(1);
    if(i ==  40){
      for (int i = 0; i<=35; i++){
        tft.fillRoundRect(120, 173-i, 80, 4,1, TFT_WHITE); 
      }
      tft.drawSmoothArc(160, 150, 50, 25, 360-90, 90, 0XFFFF, 0XFFFF, true);
    }
  }
}

void cambio_happy(){
  blink_();
  tft.fillEllipse(53, 80, 40, 40, 0XFFFF);
  tft.fillEllipse(267, 80, 40, 40, 0xFFFF);
  for (int i = 0; i<=35; i++){
    tft.fillRoundRect(120, 173-i, 80, 4,1, TFT_WHITE); 
  }
  tft.drawSmoothArc(160, 150, 50, 25, 360-90, 90, 0XFFFF, 0XFFFF, true);
}
//----------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------MUCHA_AGUA----------------------------------------------------------------------

void cambio_mucha_agua(){
  blink_();
  tft.fillEllipse(53, 80, 40, 40, 0XFFFF);
  tft.fillEllipse(267, 80, 40, 40, 0xFFFF);
  
  for (int i = 0; i <=150; i++){
    //tft.drawSmoothArc(160, 150, 50, 25, 270, 90, 0XFFFF, 0x0000, true);
    tft.fillTriangle(-10,-61+i, 90,-93+i, 60,10, TFT_BLACK);
    tft.fillTriangle(330,-61+i, 230,-93+i, 260,10, TFT_BLACK);
    if(i ==  140){
      tft.fillEllipse(160, 180, 80, 80, 0x0000);
      //tft.drawSmoothArc(160, 180, 50, 25, 90, 270, 0XFFFF, 0x0000, true);
      //tft.fillEllipse(160, 180, 50, 50, 0XFFFF);
      //tft.fillRoundRect(110, 180, 110, 51, 0, 0X0000);
      tft.drawSmoothArc(160, 190, 50, 42, 110, 250, 0XFFFF, 0x0000, true);
    }
    delay(5);
  }
  //tft.fillEllipse(96, 175, 30, 30, 0xFFFF);
  //tft.fillEllipse(224, 175, 30, 30, 0xFFFF);
  
  tft.drawEllipse(96, 175, 30, 30, 0xFFFF);
  tft.drawEllipse(224, 175, 30, 30, 0xFFFF);
  
  tft.drawEllipse(96, 175, 29, 29, 0xFFFF);
  tft.drawEllipse(224, 175, 29, 29, 0xFFFF);

  tft.drawEllipse(96, 175, 28, 28, 0xFFFF);
  tft.drawEllipse(224, 175, 28, 28, 0xFFFF);

  tft.drawEllipse(96, 175, 27, 27, 0xFFFF);
  tft.drawEllipse(224, 175, 27, 27, 0xFFFF);
  
  tft.fillEllipse(88, 180, 35, 35, 0x0000);
  tft.fillEllipse(232, 180, 35, 35, 0x0000);
  delay(1000);
}
void mucha_agua(){
  tft.fillEllipse(53, 80, 40, 40, 0XFFFF);
  tft.fillEllipse(267, 80, 40, 40, 0xFFFF);
  tft.fillTriangle(-10,-61+150, 90,-93+150, 60,10, TFT_BLACK);
  tft.fillTriangle(330,-61+150, 230,-93+150, 260,10, TFT_BLACK);
}

//----------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------FRIO-----------------------------------------------------------------------


void cambio_frio(){
  char blue = 0x1d74;
  blink_();
  tft.fillScreen(blue);
  tft.fillEllipse(53, 80, 40, 40, 0XFFFF);
  tft.fillEllipse(267, 80, 40, 40, 0xFFFF);
  for (int i = 0; i <= 70; i += 1) {
    tft.fillEllipse(20, 10, i, i, blue);
    tft.fillEllipse(287, 10, i, i, blue);
    if(i ==  40){
      tft.fillEllipse(20, 110, 8, 8, 0x9fde);
      tft.fillEllipse(300, 110, 8, 8, 0x9fde);
      tft.fillEllipse(160, 180, 80, 80, blue);
      //tft.drawSmoothArc(160, 170, 30, 15, 90, 270, 0XFFFF, blue, true);
      //tft.fillEllipse(160, 180, 50, 50, 0XFFFF);
      //tft.fillRoundRect(110, 180, 110, 51, 0, 0X0000);
      tft.fillRoundRect(94, 148, 130, 40, 0, 0XFFFF);
      //tft.fillRoundRect(94, 167, 130, 4, 0, 0x0000);

      //tft.fillRoundRect(68, 147, 26, 42, 0, 0x0000);
      //tft.fillRoundRect(224, 147, 26, 42, 0, 0x0000);
    }
    
    delay(1);
  }
    for (int i = 0; i <= 200; i += 1) {
      tft.fillRoundRect(94, 148, 130, 40, 0, 0XFFFF);
      tft.fillRoundRect(94, 167, 130, 2, 0, blue);
      delay(100);
      //tft.fillRoundRect(94, 148, 130, 40, 0, 0XFFFF);
      tft.fillRoundRect(94, 167, 130, 5, 0, blue);
      delay(100);
      //tft.fillRoundRect(68, 147, 26, 42, 0, 0x0000);
      //tft.fillRoundRect(224, 147, 26, 42, 0, 0x0000);
    }
    tft.fillScreen(0x0000);

}

void frio(){
  int del = 8;
  for(int i = 0; i<=10;i++){
    tft.fillRoundRect(94+i, 148, 130, 40, 0, 0XFFFF);
    tft.fillRoundRect(94+i, 167, 130, 4, 0, 0XFFFF);
    
    tft.fillRoundRect(68+i, 147, 26, 42, 0, 0XFFFF);
    tft.fillRoundRect(224+i, 147, 26, 42, 0, 0XFFFF);
    delay(del);
  }
  for(int i = 0; i<=10;i++){
    tft.fillRoundRect(94-i, 148, 130, 40, 0, 0XFFFF);
    tft.fillRoundRect(94-i, 167, 130, 4, 0, 0XFFFF);
    
    tft.fillRoundRect(68-i, 147, 26, 42, 0, 0XFFFF);
    tft.fillRoundRect(224-i, 147, 26, 42, 0, 0XFFFF);
    delay(del);
  }
  for(int i = 0; i<=10;i++){
    tft.fillRoundRect(94-i, 148, 130, 40, 0, 0XFFFF);
    tft.fillRoundRect(94-i, 167, 130, 4, 0, 0XFFFF);
    
    tft.fillRoundRect(68-i, 147, 26, 42, 0, 0XFFFF);
    tft.fillRoundRect(224-i, 147, 26, 42, 0, 0XFFFF);
    delay(del);
  }
  for(int i = 0; i<=10;i++){
    tft.fillRoundRect(94+i, 148, 130, 40, 0, 0XFFFF);
    tft.fillRoundRect(94+i, 167, 130, 4, 0, 0XFFFF);
    
    tft.fillRoundRect(68+i, 147, 26, 42, 0, 0XFFFF);
    tft.fillRoundRect(224+i, 147, 26, 42, 0, 0XFFFF);
    delay(del);
  }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------SEDIENTA-------------------------------------------------------------------

void cambio_sedienta(){
  for (int i = 0; i <=200; i++){
    if (i <= 150){
      //tft.drawSmoothArc(160, 150, 50, 25, 270, 90, 0XFFFF, 0x0000, true);
      tft.fillTriangle(-10,-60+i, 140,-90+i, 10,10, (0,255,0));
      tft.fillTriangle(330,-60+i, 180,-90+i, 310,10, TFT_BLACK);
      if(i ==  100){
        tft.fillEllipse(160, 180, 80, 80, 0x0000);
        tft.drawSmoothArc(160, 180, 50, 25, 90, 270, 0XFFFF, 0x0000, true);
        tft.fillEllipse(160, 180, 50, 50, 0XFFFF);
        tft.fillRoundRect(110, 180, 110, 51, 0, 0X0000);
      }
    }
    if (i >= 120 && i<=138){
        tft.drawSmoothArc(132, 180, i-119, 0, 270, 90, 0xe49f, 0x0000, false);
    }    
    delay(5);
  }
  //delay(1000);
}

void sedienta(){
  //tft.drawSmoothArc(160, 180, 50, 48, 90, 270, TFT_GREEN, 0xFFFF, false);
  for (int i = 0; i<=10;i++){
    tft.drawSmoothArc(160, 180, 50+i, 48, 90, 270, 0xFFFF, 0xFFFF, false);
    tft.drawSmoothArc(132, 180, 18+(i/3), 17, 270, 90, 0xe49f, 0xe49f, false);
    delay(40);
  }
  for(int i = 0; i<=10;i++){
    tft.drawSmoothArc(160, 180, 60-i, 59-i, 90, 270, 0x0000, 0x0000, false);
    tft.drawSmoothArc(132, 180, 21-(i/3), 20-(i/3), 270, 90, 0x0000, 0x0000, false);
    delay(40);
  }
  
  
  //tft.drawSmoothArc(132, 175, i-119, 0, 270, 90, 0xe49f, 0x0000, false);
}
//----------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------OSCURO-------------------------------------------------------------------

uint16_t color565(int r, int g, int b) {
  return ((r & 0xF8) << 8) | ((g & 0xFC) << 3) | (b >> 3);
}
void cambio_oscuro() {
  for (int i = 0; i <= 254; i=i+5) {
    int red = 255;
    int green = 255 - i;
    int blue = 255 - i;

    uint16_t color1 = color565(red, green, blue);
    uint16_t color2 = color565(red, green, blue);

    tft.fillEllipse(53, 80, 40, 40, color1);
    tft.fillEllipse(267, 80, 40, 40, color2);
    delay(2);
  }
  //delay(1000);
  for (int i = 0; i <= 170; i++) {
    if (i<= 150){
      tft.fillTriangle(-10, -80 + i, 140, -40 + i, 10, 10, TFT_BLACK);
      tft.fillTriangle(330, -80 + i, 180, -40 + i, 310, 10, TFT_BLACK);
    }
    else{
      tft.fillTriangle(130, 138, 150, 138, 140, i-10, TFT_RED);
      tft.fillTriangle(170, 138, 190, 138, 180, i-10, TFT_RED);
    }
    delay(10);
    
    //tft.fillTriangle(330, -80 + i, 180, -40 + i, 310, 10, TFT_BLACK);
  }
  // delay(1000);
}

void oscuro(){
//  tft.fillEllipse(53, 80, 40, 40, TFT_RED);
//  tft.fillEllipse(267, 80, 40, 40, TFT_RED);
  for (int i = 0; i <= 170; i++) {
    if (i<= 150){
      tft.fillTriangle(-10, -80 + i, 140, -40 + i, 10, 10, TFT_BLACK);
      tft.fillTriangle(330, -80 + i, 180, -40 + i, 310, 10, TFT_BLACK);
    }
    else{
      tft.fillTriangle(130, 138, 150, 138, 140, i-10, TFT_RED);
      tft.fillTriangle(170, 138, 190, 138, 180, i-10, TFT_RED);
    }
    delay(10);
    
    //tft.fillTriangle(330, -80 + i, 180, -40 + i, 310, 10, TFT_BLACK);
  }
}


//----------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------RANDOM-------------------------------------------------------------------


void cambio_random(){
  for (int i = 0; i <=150; i++){
    //tft.drawSmoothArc(160, 150, 50, 25, 270, 90, 0XFFFF, 0x0000, true);
    tft.fillTriangle(-10,-80+i, 140,-80+i, 10,10, TFT_BLACK);
    tft.fillTriangle(330,-80+i, 180,-80+i, 310,10, TFT_BLACK);
    if(i ==  100){
      tft.fillEllipse(160, 180, 80, 80, 0x0000);
      //tft.drawSmoothArc(160, 180, 50, 25, 90, 270, 0XFFFF, 0x0000, true);
      //tft.fillEllipse(160, 180, 50, 50, 0XFFFF);
      //tft.fillRoundRect(110, 180, 110, 51, 0, 0X0000);
      tft.fillRoundRect(120, 170, 80, 15, 0, 0XFFFF);
    }
    
    delay(5);
  }
  delay(1000);
}








void face_static(){
  tft.fillEllipse(160, 180, 100, 100, 0x0000);
  tft.fillEllipse(53, 80, 40, 40, 0XFFFF);
  tft.fillEllipse(267, 80, 40, 40, 0xFFFF);
  for (int i = 0; i<=35; i++){
    tft.fillRoundRect(120, 173-i, 80, 4,1, TFT_WHITE); 
  }
  tft.drawSmoothArc(160, 150, 50, 25, 360-90, 90, 0XFFFF, 0XFFFF, true);
  //tft.fillEllipse(53, 80, 42, 42, 0X0000);
  //tft.fillEllipse(267, 80, 42, 42, 0x0000);
}

void blacken(int j = 40){
  tft.fillEllipse(53, 80, 40, j, 0x0000);
  tft.fillEllipse(267, 80, 40, j, 0x0000);
}

void blink_face(){
  int pi = 0;
  for (int i = 40; i >= 0; i -= 20) {
    blacken(pi);
    //delay(0.1);
    tft.fillEllipse(53, 80, 40, i, 0XFFFF);
    tft.fillEllipse(267, 80, 40, i, 0xFFFF);
    pi = i;
    delay(50);
  }
  delay(200);
  for (int i = 0; i <= 40; i += 2) {
    tft.fillEllipse(53, 80, 40, i, 0XFFFF);
    tft.fillEllipse(267, 80, 40, i, 0xFFFF);
    delay(2);
  }
}

void blink_(){
  close_eyes();
  delay(10);
  open_eyes();
}

void blacken1(int j){
  tft.fillEllipse(267, 80, 40, j, 0x0000);
}

void blink_right_eye(){
  int pi = 0;
  for (int i = 40; i >= 0; i -= 1) {
    blacken1(pi);
    tft.fillEllipse(267, 80, 40, i, 0xFFFF);
    pi = i;
    delay(1);
  }
  delay(200);
  for (int i = 0; i <= 40; i += 1) {
    tft.fillEllipse(267, 80, 40, i, 0xFFFF);
    delay(1);
  }
}
void close_eyes(){
  tft.fillEllipse(53, 80, 40, 40, 0XFFFF);
  tft.fillEllipse(267, 80, 40, 40, 0xFFFF);  
  for (int i = 40; i >= 0; i -= 1) {
    tft.drawEllipse(53, 80, 41, i, 0x0000);
    tft.drawEllipse(267, 80, 41, i, 0x0000);
    delay(1);
  }
  blacken();
  delay(100);
}
void open_eyes(){
  tft.fillEllipse(53, 80, 40, 3, 0XFFFF);
  tft.fillEllipse(267, 80, 40, 3, 0XFFFF);
  for (int i = 0; i <= 40; i += 1) {
    tft.drawEllipse(53, 80, 40, i, 0XFFFF);
    tft.drawEllipse(267, 80, 40, i, 0XFFFF);
    delay(1);
  }
}

void look_left(){
  //tft.fillScreen(0x0000);
  tft.fillEllipse(53, 80, 40, 40, 0XFFFF);
  tft.fillEllipse(267, 80, 40, 40, 0xFFFF);
  delay(100);
  int j = 0,i;
  int xx=0, yy=0,xxx=0,yyy=0;
  for (i = 0; i <= 10; i += 1) {
    tft.drawEllipse(53-j, 80, 40, 40, 0X0000);
    tft.drawEllipse(267-j, 80, 40, 40, 0X0000);
    tft.fillEllipse(53-i, 80, 40, 40, 0XFFFF);
    tft.fillEllipse(267-i, 80, 40, 40, 0XFFFF);
    j = i;
    delay(6);
  }
  xx = 53-i;
  yy = 267-i;
  delay(1000);
  for (i = 0; i <= 20; i += 1) {
    tft.drawEllipse(xx+j, 80, 40, 40, 0X0000);
    tft.drawEllipse(yy+j, 80, 40, 40, 0X0000);
    tft.fillEllipse(xx+i, 80, 40, 40, 0XFFFF);
    tft.fillEllipse(yy+i, 80, 40, 40, 0XFFFF);
    j = i;
    delay(6);
  }
  xxx = xx+j;
  yyy = yy+j;
  delay(1000);
  for (i = 0; i <= 10; i += 1) {
    tft.drawEllipse(xxx-j, 80, 40, 40, 0X0000);
    tft.drawEllipse(yyy-j, 80, 40, 40, 0X0000);
    tft.fillEllipse(xxx-i, 80, 40, 40, 0XFFFF);
    tft.fillEllipse(yyy-i, 80, 40, 40, 0XFFFF);
    j = i;
    delay(6);
  }  
}



void sad_eye(){
  tft.fillScreen(0x0000);
  tft.fillEllipse(53, 80, 40, 40, 0XFFFF);
  tft.fillEllipse(267, 80, 40, 40, 0xFFFF);
  delay(1000);
  for (int i = 0; i <= 70; i += 1) {
    tft.fillEllipse(20, 10, i, i, 0x0000);
    tft.fillEllipse(287, 10, i, i, 0x0000);
    delay(1);
  }
}

void happy_eye(){
  //tft.fillScreen(0x0000);
  //tft.fillEllipse(53, 80, 40, 40, 0XFFFF);
  //tft.fillEllipse(267, 80, 40, 40, 0xFFFF);
  //tft.drawSmoothArc(160, 150, 50, 25, 270, 90, 0XFFFF, 0x0000, true);
  delay(1000);
  for (int i = 0; i <= 40; i += 1) {
    tft.fillEllipse(53-7, 80+40, 50, i, 0X0000);
    tft.fillEllipse(267+7, 80+40, 50, i, 0X0000);
    delay(1);
  }
}

void mouth(){
  tft.fillScreen(0x0000);
  tft.drawArc(160, 150, 50, 25, 270, 90, TFT_RED, TFT_GREEN, true);
  for (int i = 20; i >= 0; i -= 1) {
    tft.drawSmoothArc(160, 150, 50, i, 270, 90, TFT_WHITE, TFT_BLACK, true);
    tft.drawSmoothArc(160, 150, 50, i, 270, 90, TFT_WHITE, TFT_BLACK, true);
    delay(1);
  }

}


void drawArcToCircle() {
    tft.fillScreen(0x0000);
    for (int i = 1; i <= 30; i += 1) {
      tft.fillRoundRect(160, 150, 50+i, i, i, TFT_WHITE);
      delay(10);
    }
    //tft.fillRoundRect(160, 150, 80, 30, 10, TFT_WHITE);
    delay(100); // Pequeña pausa para apreciar el movimiento
}

void cicle_mouth() {
  tft.fillScreen(0x0000);
  for (int i = 1; i <= 40; i += 1) {
      tft.fillCircleHelper(160, 150-(i/2), i, 1,2, TFT_WHITE);
      delay(5);
  }
   delay(2000);
  //tft.drawCircleHelper(180, 150, 40, 6, TFT_RED);
  //tft.drawCircleHelper(140, 150, 40, 9, TFT_RED);
  int xx = 140;
  int yy = 180;
  //tft.drawSmoothArc(120, 150, 40, 35, 90, 0, TFT_GREEN, TFT_GREEN, true);
  for (int i = 40; i >= 20; i -= 0.5) {
      tft.drawSmoothArc(xx+1, 150, i, i-5, 0, 180, TFT_BLACK, TFT_BLACK, true);
      tft.drawSmoothArc(yy-1, 150, i, i-5, 180, 0, TFT_BLACK, TFT_BLACK, true);
      //tft.drawCircleHelper(180, 150, 40, 6, TFT_RED);
      //tft.drawCircleHelper(xx+1, 150, i, 9, TFT_RED);
      xx = xx+1;
      yy = yy-1;
      delay(5);
  }
  delay(2000);
  for (int i = 1; i <= 40; i += 3) {
      tft.fillCircleHelper(160, 150-(i/2), i, 1,2, TFT_WHITE);
      delay(5);
  }
   delay(2000);
}


void turn_lightblue(){
  int16_t x = 53;
  int16_t y = 80;
  int16_t width = 40;
  int16_t height = 40;

  // Color inicial (blanco)
  uint16_t initialColor = 0xFFFF;

  // Color final (rojo)
  uint16_t finalColor = 0xF800; // Rojo puro

  // Número de pasos para la transición
  int steps = 100;

  // Bucle para la transición de color
  for (int i = 0; i <= steps; i += 5) {
    // Calcular el color intermedio
    uint8_t r = map(i, 0, steps, 255, 135); // Componente R (rojo)
    uint8_t g = map(i, 0, steps, 255, 206); // Componente G (verde)
    uint8_t b = map(i, 0, steps, 255, 250); // Componente B (azul)
    uint16_t color = tft.color565(r, g, b); // Convertir a formato de color de 16 bits

    // Dibujar la elipse con el color intermedio
    //tft.fillScreen(0x0000); // Limpiar pantalla
    tft.fillEllipse(x, y, width, height, color);

    // Pequeño retraso para apreciar la transición
    delay(50);
  }
}
void happy_start(){
  delay(1000);
  for (int i = 0; i <= 40; i += 1) {
    tft.fillEllipse(53-7, 80+40, 50, i, 0X0000);
    tft.fillEllipse(267+7, 80+40, 50, i, 0X0000);
    if(i<=34){
      tft.fillRoundRect(120, 173-i, 80, 4,1, TFT_WHITE);
    }
    delay(1);
  }
}



void turn_on(){
  //tft.drawSmoothArc(160, 150, 50, 25, 270, 90, 0XFFFF, 0x0000, true);
  for (int i = 1; i <= 40; i += 1) {
      tft.fillEllipse(53, 80, i, i, 0XFFFF);
      if (i > 30){
        tft.fillEllipse(267, 80, i, i, 0xFFFF);
      }
      delay(4);
  }
  delay(1500);

  blink_();
  delay(10);
  blink_();
  delay(20);

  for (int i = 1; i <= 90; i += 3) {
      tft.drawSmoothArc(160, 150, 50, 25, 360-i, i, 0XFFFF, 0XFFFF, true);
      delay(4);
  }
  delay(1000);
  delay(1000);
  look_left();
  delay(1000);
  happy_start();
  delay(5000);
  tft.fillEllipse(53, 80, 42, 42, 0X0000);
  tft.fillEllipse(267, 80, 42, 42, 0x0000);
  
}
