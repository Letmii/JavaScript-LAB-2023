document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 600;

  function createBall() {
      return {
          radius: 5,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speedX: (Math.random() - 0.5) * 4,
          speedY: (Math.random() - 0.5) * 4,
          draw: function() {
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
              ctx.fillStyle = 'blue';
              ctx.fill();
              ctx.closePath();
          },
          update: function() {
              this.x += this.speedX;
              this.y += this.speedY;

              if (this.x <= this.radius || this.x >= canvas.width - this.radius) {
                  this.speedX = -this.speedX;
              }
              if (this.y <= this.radius || this.y >= canvas.height - this.radius) {
                  this.speedY = -this.speedY;
              }
          }
      };
  }

  let balls = [];
  for (let i = 0; i < 20; i++) {
      balls.push(createBall());
  }

  function drawLineIfClose(ball1, ball2, threshold) {
      const dx = ball1.x - ball2.x;
      const dy = ball1.y - ball2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < threshold) {
          ctx.beginPath();
          ctx.moveTo(ball1.x, ball1.y);
          ctx.lineTo(ball2.x, ball2.y);
          ctx.strokeStyle = 'rgba(0,0,0,0.1)';
          ctx.stroke();
      }
  }

  let animationFrameId;

  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach(ball => {
          ball.draw();
          ball.update();
      });

      for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
              drawLineIfClose(balls[i], balls[j], 100);
          }
      }

      animationFrameId = requestAnimationFrame(animate);
  }

  function startAnimation() {
      if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(animate);
  }

  function resetAnimation() {
      if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
      }
      balls = balls.map(() => createBall());
      animationFrameId = requestAnimationFrame(animate);
  }

  document.getElementById('startButton').addEventListener('click', startAnimation);
  document.getElementById('resetButton').addEventListener('click', resetAnimation);
});
