# Ағылшынша оңай: мобильдік қолданба

`../index.html` веб-қосымшасын Capacitor арқылы Android қолданбасына айналдырады.

## APK алу (GitHub Actions)

1. GitHub-та репозиторийдің **Actions** бөліміне өтіңіз, **Android APK** жұмысын ашыңыз.
2. Соңғы іске қосудың төменгі жағынан `english-easy-debug-apk` файлын жүктеңіз.
3. Ішіндегі `app-debug.apk` файлын Android телефонға көшіріп, орнатыңыз (орнату кезінде «белгісіз көзден орнатуға» рұқсат керек).

## Өз компьютерінде жинау

Node 22, JDK 21 және Android SDK керек.

```
cd english-kz/mobile
npm install
npm run android
npx capacitor-assets generate --android --iconBackgroundColor '#00839e'
cd android && ./gradlew assembleDebug
```

## Ескертпе

- AI мұғалім бөлімі қолданбада жасырылған: ол Claude беті ішінде ғана жұмыс істейді. Қосу үшін өз сервер мен API кілті керек.
- Google Play үшін қол қойылған release жинағы (AAB) және әзірлеуші аккаунты керек. Бұл debug APK тек тікелей орнатуға арналған.
- iOS үшін Mac және Xcode керек: `npm i @capacitor/ios && npx cap add ios`.
- Қолданба коды `../index.html` ішінде. Оны өзгертсеңіз, қолданбаны қайта жинаңыз.
