document.addEventListener('DOMContentLoaded', () => {
  // Ustawienie elementu canvas i jego kontekstu 2D.
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 600;

  // Funkcja tworząca obiekt reprezentujący kulę.
  function createBall() {
      return {
          radius: 5, // Promień kuli.
          x: Math.random() * canvas.width, // Losowa pozycja początkowa X.
          y: Math.random() * canvas.height, // Losowa pozycja początkowa Y.
          speedX: (Math.random() - 0.5) * 4, // Losowa prędkość początkowa X.
          speedY: (Math.random() - 0.5) * 4, // Losowa prędkość początkowa Y.
          draw: function() {
              // Metoda rysująca kulę na canvas.
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
              ctx.fillStyle = 'blue';
              ctx.fill();
              ctx.closePath();
          },
          update: function() {
              // Metoda aktualizująca pozycję kuli.
              this.x += this.speedX;
              this.y += this.speedY;

              // Odbijanie kuli od krawędzi canvas.
              if (this.x <= this.radius || this.x >= canvas.width - this.radius) {
                  this.speedX = -this.speedX;
              }
              if (this.y <= this.radius || this.y >= canvas.height - this.radius) {
                  this.speedY = -this.speedY;
              }
          }
      };
  }

  // Tworzenie początkowej tablicy kulek.
  let balls = [];
  for (let i = 0; i < 20; i++) {
      balls.push(createBall());
  }

  // Funkcja rysująca linię między dwiema bliskimi kulkami.
  function drawLineIfClose(ball1, ball2, threshold) {
      const dx = ball1.x - ball2.x;
      const dy = ball1.y - ball2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < threshold) {
          ctx.beginPath();
          ctx.moveTo(ball1.x, ball1.y);
          ctx.lineTo(ball2.x, ball2.y);
          ctx.strokeStyle = 'rgba(0,0,0,0.1)'; // Kolor i przezroczystość linii.
          ctx.stroke();
      }
  }

  // Zmienna przechowująca identyfikator bieżącej animacji.
  let animationFrameId;

  // Funkcja animująca ruch kulek.
  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Czyszczenie canvas.

      // Rysowanie i aktualizacja każdej kuli.
      balls.forEach(ball => {
          ball.draw();
          ball.update();
      });

      // Rysowanie linii między bliskimi kulkami.
      for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
              drawLineIfClose(balls[i], balls[j], 100); // Określenie odległości dla linii.
          }
      }

      // Zaplanowanie kolejnej klatki animacji.
      animationFrameId = requestAnimationFrame(animate);
  }

  // Funkcja obsługująca rozpoczęcie animacji.
  function startAnimation() {
      if (animationFrameId) {
          cancelAnimationFrame(animationFrameId); // Anulowanie bieżącej animacji, jeśli jest aktywna.
      }
      animationFrameId = requestAnimationFrame(animate); // Rozpoczęcie nowej animacji.
  }

  // Funkcja obsługująca resetowanie i restartowanie animacji.
  function resetAnimation() {
      if (animationFrameId) {
          cancelAnimationFrame(animationFrameId); // Anulowanie bieżącej animacji.
          animationFrameId = null;
      }
      balls = balls.map(() => createBall()); // Resetowanie stanu kulek.
      animationFrameId = requestAnimationFrame(animate); // Rozpoczęcie nowej animacji.
  }

  // Obsługa zdarzeń start i reset.
  document.getElementById('startButton').addEventListener('click', startAnimation);
  document.getElementById('resetButton').addEventListener('click', resetAnimation);
});
