import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check } from 'lucide-react';


const ReverseCipher = () => {
  const [inputText, setInputText] = useState('');
  const [cipherType, setCipherType] = useState('reverse-word');
  const [exercise, setExercise] = useState({ question: '', answer: '', userAnswer: '', type: '' });
  const [isCorrect, setIsCorrect] = useState(null);
  const [copied, setCopied] = useState(false);

  const exercises = [
    { question: 'SELAMAT PAGI', answer: 'TAMALES IGAP', type: 'reverse-word' },
    { question: 'SAYA SUKA PROGRAMMING', answer: 'AYAS AKUS GNIMMARGORP', type: 'reverse-word' },
    { question: 'MALAYSIA123', answer: '321AISYALAM', type: 'reverse-sentence' },
    { question: 'HELLO WORLD', answer: 'DLROW OLLEH', type: 'reverse-sentence' }
  ];

  const processText = (text) => {
    const upperText = text.toUpperCase();
    return cipherType === 'reverse-word'
      ? upperText.split(' ').map(word => word.split('').reverse().join('')).join(' ')
      : upperText.split('').reverse().join('');
  };

  const getLetterColor = (char) => {
    if (/[AEIOU]/.test(char)) return 'bg-rose-200';
    if (/[0-9]/.test(char)) return 'bg-violet-200';
    if (/[^A-Z0-9\s]/.test(char)) return 'bg-yellow-200';
    return 'bg-blue-200';
  };

  const createLetterBoxes = (text) => {
    return text.split('').map((char, index) => (
      <div
        key={index}
        className={`w-8 h-8 border-2 border-gray-200 flex items-center justify-center m-1 text-sm font-bold rounded-md 
          ${getLetterColor(char)} text-gray-700 transform transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-sm`}
      >
        {char}
      </div>
    ));
  };

  const copyToClipboard = async (text) => {
    if (!text) return;
    
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
    document.body.removeChild(textArea);
  };

  const generateNewExercise = () => {
    const randomEx = exercises[Math.floor(Math.random() * exercises.length)];
    setExercise({ ...randomEx, userAnswer: '' });
    setIsCorrect(null);
    setCipherType(randomEx.type);
  };

  const checkAnswer = () => {
    const isAnswerCorrect = exercise.userAnswer.toUpperCase() === exercise.answer;
    setIsCorrect(isAnswerCorrect);
  };

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <Tabs defaultValue="cipher">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cipher">Cipher</TabsTrigger>
          <TabsTrigger value="exercise">Latihan</TabsTrigger>
        </TabsList>

        <TabsContent value="cipher">
          <Card className="shadow-lg bg-gradient-to-br from-gray-50 to-gray-100">
            <CardHeader className="bg-gradient-to-r from-yellow-200 to-orange-200 text-gray-800 rounded-t-lg">
              <CardTitle className="text-2xl font-bold text-center">Reverse Cipher</CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              <div className="flex justify-center gap-2 mb-6 mt-4">
                <button
                  onClick={() => setCipherType('reverse-word')}
                  className={`px-6 py-2 rounded-md transition-transform hover:scale-105 
                    ${cipherType === 'reverse-word' 
                      ? 'bg-blue-500 text-white' 
                      : 'border border-blue-500 text-blue-500'}`}
                >
                  Songsang Perkataan
                </button>
                <button
                  onClick={() => setCipherType('reverse-sentence')}
                  className={`px-6 py-2 rounded-md transition-transform hover:scale-105
                    ${cipherType === 'reverse-sentence' 
                      ? 'bg-blue-500 text-white' 
                      : 'border border-blue-500 text-blue-500'}`}
                >
                  Songsang Ayat
                </button>
              </div>

              <Input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value.slice(0, 20))}
                placeholder="Masukkan teks (maksimum 20 aksara)"
                className="mb-6"
              />

              <div className="space-y-4">
                <Card className="p-4 bg-white/50">
                  <div className="text-sm text-gray-600 mb-2 font-medium">Teks Asal:</div>
                  <div className="flex flex-wrap justify-center">
                    {createLetterBoxes(inputText)}
                  </div>
                </Card>

                <div className="text-center text-gray-400 text-2xl animate-bounce">↓</div>

                <Card className="p-4 bg-white/50 relative">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-gray-600 font-medium">Hasil Songsang:</div>
                    <button 
                      onClick={() => copyToClipboard(processText(inputText))}
                      className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-green-500">Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex flex-wrap justify-center">
                    {createLetterBoxes(processText(inputText))}
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercise">
          <Card>
            <CardHeader>
              <CardTitle>Latihan Reverse Cipher</CardTitle>
            </CardHeader>
            <CardContent>
              {exercise.question ? (
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Jenis Songsangan:</p>
                    <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {exercise.type === 'reverse-word' ? 'Songsang Perkataan' : 'Songsang Ayat'}
                    </div>
                    <p className="font-medium mt-4">Soalan:</p>
                    <p className="text-lg font-bold">{exercise.question}</p>
                  </div>
                  <Input
                    placeholder="Masukkan jawapan anda"
                    value={exercise.userAnswer}
                    onChange={(e) => setExercise({ ...exercise, userAnswer: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={checkAnswer}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Semak Jawapan
                    </button>
                    <button
                      onClick={generateNewExercise}
                      className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                    >
                      Soalan Baru
                    </button>
                  </div>
                  {isCorrect !== null && (
                    <div className={`p-4 rounded-md ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {isCorrect ? 'Tahniah! Jawapan anda betul!' : 'Maaf, cuba lagi. Jawapan yang betul ialah: ' + exercise.answer}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={generateNewExercise}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Mula Latihan
                </button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReverseCipher;