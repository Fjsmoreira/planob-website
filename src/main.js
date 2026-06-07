class LiteYouTube extends HTMLElement {
  connectedCallback() {
    const videoId = this.getAttribute('videoid');
    const title = this.getAttribute('videotitle') || 'Vídeo do YouTube';
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute('aria-label', `Reproduzir ${title}`);
    this.style.backgroundImage = `linear-gradient(180deg, rgba(4, 10, 10, .08), rgba(4, 10, 10, .72)), url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)`;
    this.innerHTML = `<span class="play-button" aria-hidden="true"></span><span class="video-label">Ver vídeo</span>`;
    const activate = () => {
      const iframe = document.createElement('iframe');
      iframe.width = '560';
      iframe.height = '315';
      iframe.title = title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
      this.replaceChildren(iframe);
      this.classList.add('is-playing');
    };
    this.addEventListener('click', activate, { once: true });
    this.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate();
      }
    }, { once: true });
  }
}

customElements.define('lite-youtube', LiteYouTube);

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('#budgetForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const lines = [
    'Olá Plano B,',
    '',
    'Gostaria de pedir orçamento para música ao vivo no nosso casamento.',
    '',
    `Nome: ${data.get('nome') || ''}`,
    `Email: ${data.get('email') || ''}`,
    `Data: ${data.get('data') || ''}`,
    `Local: ${data.get('local') || ''}`,
    '',
    'Mensagem:',
    `${data.get('mensagem') || ''}`,
  ];

  const subject = encodeURIComponent('Pedido de orçamento para casamento');
  const body = encodeURIComponent(lines.join('\n'));
  window.location.href = `mailto:Info@Planobmusica.pt?subject=${subject}&body=${body}`;
});
