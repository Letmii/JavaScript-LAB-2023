// Pobieranie elementów z HTML-a
const liczba1 = document.getElementById('liczba1');
const liczba2 = document.getElementById('liczba2');
const liczba3 = document.getElementById('liczba3');
const liczba4 = document.getElementById('liczba4');
const przeliczBtn = document.getElementById('przelicz');
const wyniki = document.getElementById('wyniki');

// Obsługa zdarzenia po kliknięciu przycisku "Przelicz"
przeliczBtn.addEventListener('click', () => {
  // Pobierz wartości z pól tekstowych i przekształć je na liczby
  const value1 = parseFloat(liczba1.value);
  const value2 = parseFloat(liczba2.value);
  const value3 = parseFloat(liczba3.value);
  const value4 = parseFloat(liczba4.value);

  // Obliczenia
  const suma = value1 + value2 + value3 + value4;
  const srednia = suma / 4;
  const minValue = Math.min(value1, value2, value3, value4);
  const maxValue = Math.max(value1, value2, value3, value4);

  // Wyświetlenie wyników na stronie
  wyniki.innerHTML = `
    Suma: ${suma} <br>
    Średnia: ${srednia} <br>
    Min: ${minValue} <br>
    Max: ${maxValue}
  `;
});
