const backdrop = document.querySelectorAll('.blur-backdrop');
// Só ativa em telas grandes
if (window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;

    backdrop.forEach(obj => {
      obj.style.background = `
        radial-gradient(circle at ${x}% ${y}%, var(--cor-deg-1), transparent 60%),
        radial-gradient(circle at ${100 - x}% ${100 - y}%, var(--cor-deg-2), transparent 70%)
      `;
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const html = document.querySelector("html");
  const darkBtn = document.getElementById("toggle-theme");
  const theme_body = document.getElementById("body_theme");
  const overlay = document.getElementById("overlay");
  const tip1 = document.getElementById("tooltip1");
  const sumBtn = document.getElementById("toggle-sumario");
  const tip2 = document.getElementById("tooltip2");
  const zommBt = document.getElementById("toggle-destaque");
  const tip3 = document.getElementById("tooltip2");

  // memoria local
  const savedTheme = localStorage.getItem("theme");
  const register_intro = localStorage.getItem("intro");

  if (savedTheme === "dark") {
    theme_body.classList.add("dark-theme");
    darkBtn.textContent = "🌙";
  } else {
    theme_body.classList.remove("dark-theme");
    darkBtn.textContent = "🌞";
  }

  // Introdução a acessibilidade 

  if (!register_intro) {
    console.log("registro não achado")
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";

    setTimeout(() => {

      // Centralizar botão e mostrar explicação
      darkBtn.style.top = "40%";
      darkBtn.style.right = "50%";
      darkBtn.style.transform = "translate(40%, -50%)";
      darkBtn.style.opacity = "1";
      darkBtn.style.pointerEvents = "auto";

      setTimeout(() => {
        tip1.style.opacity = "1";

        // Move botão para posição final
        setTimeout(() => {
          tip1.style.opacity = "0";
          darkBtn.style.top = "1rem";
          darkBtn.style.right = "0.5rem";
          darkBtn.style.transform = "none";

          // Centralizar botão e mostrar explicação
          setTimeout(() => {
            sumBtn.style.top = "40%";
            sumBtn.style.right = "50%";
            sumBtn.style.transform = "translate(40%, -50%)";
            sumBtn.style.opacity = "1";
            sumBtn.style.pointerEvents = "auto";

            setTimeout(() => {
              tip2.style.opacity = "1";

              // Move botão para posição final
              setTimeout(() => {
                tip2.style.opacity = "0";
                sumBtn.style.top = "4.5rem";
                sumBtn.style.right = "0.5rem";
                sumBtn.style.transform = "none";

                setTimeout(() => {
                  // Centralizar botão e mostrar explicação
                  setTimeout(() => {
                    zommBt.style.top = "40%";
                    zommBt.style.right = "50%";
                    zommBt.style.transform = "translate(40%, -50%)";
                    zommBt.style.opacity = "1";
                    zommBt.style.pointerEvents = "auto";

                    setTimeout(() => {
                      tip3.style.opacity = "1";

                      // Move botão para posição final
                      setTimeout(() => {
                        tip3.style.opacity = "0";
                        zommBt.style.top = "8rem";
                        zommBt.style.right = "0.5rem";
                        zommBt.style.transform = "none";

                        // Libera conteúdo da página
                        setTimeout(() => {
                          overlay.style.opacity = "0";
                          overlay.style.visibility = "hidden";
                          localStorage.setItem("intro", true);

                          html.style.overflowY = "auto";
                          setTimeout(() => {

                          }, 100);

                        }, 800);
                      }, 2500);
                    }, 1000);
                  }, 800);
                }, 100);
              }, 2500);
            }, 1000);
          }, 800);
        }, 2500);
      }, 500);
    }, 500);
  } else {
    darkBtn.style.opacity = "1";
    sumBtn.style.opacity = "1";
    zommBt.style.opacity = "1";
    html.style.overflowY = "auto";
  }
});

function dark_theme() {
  const btn = document.getElementById("toggle-theme");
  const theme_body = document.getElementById("body_theme");

  if (!btn || !theme_body) return; // segurança

  if (theme_body.classList.contains("dark-theme")) {
    theme_body.classList.remove("dark-theme");
    btn.textContent = "🌞";
    localStorage.setItem("theme", "light");

  } else {
    theme_body.classList.add("dark-theme");
    btn.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
  location.reload()
}

function carrosel_left(element) {
  const container = element.closest('.carousel-container');
  const slidesContainer = container.querySelector('.carousel-slides');
  const slide = container.querySelector('.carousel-slide');
  const slideWidth = slide.offsetWidth;

  slidesContainer.scrollLeft -= slideWidth;
}

function carrosel_right(element) {
  const container = element.closest('.carousel-container');
  const slidesContainer = container.querySelector('.carousel-slides');
  const slide = container.querySelector('.carousel-slide');
  const slideWidth = slide.offsetWidth;

  slidesContainer.scrollLeft += slideWidth;
}

const toggleBtn = document.getElementById('toggle-sumario');
const sumario = document.getElementById('sumario-flutuante');
const links = sumario.querySelectorAll('a');

// Toggle menu
toggleBtn.addEventListener('click', () => {
  sumario.classList.toggle('ativo');

  toggleBtn.classList.toggle('oculto');
});

// Fecha ao clicar em um item do menu
links.forEach(link => {
  link.addEventListener('click', () => {
    sumario.classList.remove('ativo');
    toggleBtn.classList.toggle('oculto');

  });
});

// Fecha ao clicar fora
document.addEventListener('click', (e) => {
  const isClickInsideMenu = sumario.contains(e.target);
  const isClickOnButton = toggleBtn.contains(e.target);

  if (!isClickInsideMenu && !isClickOnButton && sumario.classList.contains('ativo')) {
    sumario.classList.remove('ativo');
    toggleBtn.classList.remove('oculto');
  }
});

// Fecha menu se redimensionar a tela com ele aberto
window.addEventListener('resize', () => {
  sumario.classList.remove('ativo');
  toggleBtn.classList.remove('oculto');
});


function typeWriter(text, elementId, speed = 100, add_class = null, callback = null) {
  const el = document.getElementById(elementId);
  el.innerHTML = '';
  let i = 0;

  if (add_class && !el.classList.contains(add_class)) {
    el.classList.add(add_class);
  }

  function typing() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      const timeoutId = setTimeout(typing, speed);
      typewriterTimeouts.push(timeoutId);
    } else {
      // Após terminar a digitação
      if (add_class && el.classList.contains(add_class)) {
        el.classList.remove(add_class);
      }
      if (callback) {
        callback();
      }
    }
  }

  typing();
}



document.addEventListener("DOMContentLoaded", () => {
  let highlightDiv = null;
  let destaqueAtivo = true;

  const toggle = document.getElementById("toggle-destaque");
  const icon = document.getElementById("icon-lupa");

  // Estado salvo ao carregar
  if (localStorage.getItem("linhaDestaque") === "off") {
    destaqueAtivo = false;
    icon.classList.add("off");
  }

  toggle.addEventListener("click", () => {
    destaqueAtivo = !destaqueAtivo;
    icon.classList.toggle("off", !destaqueAtivo);
    localStorage.setItem("linhaDestaque", destaqueAtivo ? "on" : "off");
  });

  document.addEventListener("mousemove", (e) => {
    if (!destaqueAtivo) return;

    if (highlightDiv) {
      highlightDiv.remove();
      highlightDiv = null;
    }

    const x = e.clientX;
    const y = e.clientY;
    const objs = document.elementsFromPoint(x, y);
    const slideElement = objs.find(el => el.classList.contains("slide"));
    const elements = document.querySelectorAll("p, td");

    if (slideElement) {
      const slideRect = slideElement.getBoundingClientRect();
      const slideLeft = slideRect.left;
      const slideWidth = slideRect.width;

      for (let el of elements) {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while ((node = walker.nextNode())) {
          const fullText = node.textContent;
          for (let i = 0; i < fullText.length; i++) {
            const range = document.createRange();
            range.setStart(node, i);
            range.setEnd(node, i + 1);
            const rect = range.getBoundingClientRect();

            if (
              e.clientX >= rect.left &&
              e.clientX <= rect.right &&
              e.clientY >= rect.top &&
              e.clientY <= rect.bottom
            ) {
              const linhaTop = rect.top;
              const linhaBottom = rect.bottom;

              let linhaTexto = "";
              for (let j = 0; j < fullText.length; j++) {
                const r = document.createRange();
                r.setStart(node, j);
                r.setEnd(node, j + 1);
                const rRect = r.getBoundingClientRect();

                if (Math.abs(rRect.top - linhaTop) < 1 && Math.abs(rRect.bottom - linhaBottom) < 1) {
                  linhaTexto += fullText[j];
                }
              }

              const highlight = document.createElement("p");
              highlight.textContent = linhaTexto.trim();
              Object.assign(highlight.style, {
                position: "fixed",
                top: `${linhaTop}px`,
                left: `${slideLeft}px`,
                width: `${slideWidth}px`,
                color: `var(--cor-texto)`,
                background: "var(--cor-fundo)",
                fontSize: `var(--left-text-zoom)`,
                borderRadius: "5px",
                pointerEvents: "none",
                boxShadow: "0 2px 5px var(--cor-fundo-shadow)",
                zIndex: 999
              });

              document.body.appendChild(highlight);
              highlightDiv = highlight;
              return;
            }
          }
        }
      }
    }
  });

  document.addEventListener("mouseleave", () => {
    if (highlightDiv) {
      highlightDiv.remove();
      highlightDiv = null;
    }
  });
});
