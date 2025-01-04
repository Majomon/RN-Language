import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import Tts from 'react-native-tts';

const LanguageApp = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const textEnglish = 'Hello, welcome to our app!';
  const textSpanish = 'Holis, ¡bienvenido a nuestra aplicación!';

  // Dividir el texto en palabras para resaltar cada palabra
  const spanishWords = textSpanish.split(' ');

  const speakSpanish = () => {
    setIsSpeaking(true);
    setHighlightedIndex(0); // Resaltar desde la primera palabra
    Tts.setDefaultLanguage('es-ES'); // Establecer idioma español
    Tts.setDefaultRate(0.4); // Velocidad del audio
    Tts.speak(textSpanish);

    // Resaltar las palabras mientras se lee
    const interval = setInterval(() => {
      setHighlightedIndex(prevIndex => {
        const newIndex = prevIndex + 1;
        if (newIndex >= spanishWords.length) {
          clearInterval(interval); // Detener el intervalo cuando termine de leer
        }
        return newIndex;
      });
    }, 1000); // Ajusta el tiempo según el ritmo de lectura
  };

  const stopSpeaking = () => {
    Tts.stop();
    setIsSpeaking(false);
    setHighlightedIndex(0); // Resetear el índice de resaltado
  };

  useEffect(() => {
    Tts.addEventListener('tts-finish', () => setIsSpeaking(false));
    Tts.addEventListener('tts-cancel', () => setIsSpeaking(false));

    return () => {
      setIsSpeaking(false);
      setHighlightedIndex(0); // Limpiar estado al desmontar
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Practice Languages</Text>
      <View style={styles.textContainer}>
        <Text style={styles.textLabel}>English:</Text>
        <Text style={styles.text}>{textEnglish}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textLabel}>Español:</Text>
        <Text style={styles.text}>
          {spanishWords.map((word, index) => (
            <Text
              key={index}
              style={[
                styles.textWord,
                highlightedIndex === index && styles.highlightedWord, // Resaltar la palabra actual
              ]}>
              {word}{' '}
            </Text>
          ))}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={isSpeaking ? 'Stop' : 'Play Spanish Audio'}
          onPress={isSpeaking ? stopSpeaking : speakSpanish}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  textLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  textWord: {
    fontSize: 16,
    color: '#333',
  },
  highlightedWord: {
    backgroundColor: '#ffff00', // Resaltado en amarillo
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
});

export default LanguageApp;
