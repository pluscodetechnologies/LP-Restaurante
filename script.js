document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    window.addEventListener("scroll", () => {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = scrolled + "%";
    });
  }
  const cursor    = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursorRing");
  if (cursor && cursorRing && window.matchMedia("(pointer: fine)").matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId;
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top  = my + "px";
    });
    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cursorRing.style.left = rx + "px";
      cursorRing.style.top  = ry + "px";
      rafId = requestAnimationFrame(animateRing);
    };
    animateRing();
    const hoverEls = document.querySelectorAll("a, button, .menu-item, .feature-card, .delivery-card, .reservation-card");
    hoverEls.forEach(el => {
      el.addEventListener("mouseenter", () => cursorRing.classList.add("hovered"));
      el.addEventListener("mouseleave", () => cursorRing.classList.remove("hovered"));
    });
  } else {
    if (cursor) cursor.style.display = "none";
    if (cursorRing) cursorRing.style.display = "none";
  }
  const heroBg = document.getElementById("heroBg");
  if (heroBg) {
    window.addEventListener("scroll", () => {
      const scroll = window.scrollY;
      if (scroll < window.innerHeight * 1.5) {
        heroBg.style.transform = `translateY(${scroll * 0.35}px) scale(1.1)`;
      }
    });
  }
  const navbar = document.querySelector(".navbar");
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  if (mobileBtn && navbar) {
    mobileBtn.addEventListener("click", () => {
      navbar.classList.toggle("mobile-menu-open");
      const icon = mobileBtn.querySelector("i");
      const isOpen = navbar.classList.contains("mobile-menu-open");
      icon.className = isOpen ? "fas fa-times" : "fas fa-bars";
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navbar.classList.remove("mobile-menu-open");
        mobileBtn.querySelector("i").className = "fas fa-bars";
        document.body.style.overflow = "";
      });
    });
  }
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const current = window.scrollY;
    if (current > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    if (current > lastScroll && current > 200) {
      navbar.classList.add("navbar-hidden");
    } else {
      navbar.classList.remove("navbar-hidden");
    }
    lastScroll = current;
  });
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
  const scrollDown = document.getElementById("scrollDown");
  if (scrollDown) {
    scrollDown.addEventListener("click", () => {
      window.scrollBy({ top: window.innerHeight - 80, behavior: "smooth" });
    });
  }
  const backToTop = document.createElement("a");
  backToTop.href = "#";
  backToTop.className = "back-to-top";
  backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
  backToTop.setAttribute("aria-label", "Voltar ao topo");
  document.body.appendChild(backToTop);
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });
  backToTop.addEventListener("click", e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  const observerOpts = { threshold: 0.12, rootMargin: "0px 0px -60px 0px" };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOpts);
  const revealEls = document.querySelectorAll(
    ".section-title, .about-text, .about-image, .menu-item, .testimonial, .feature-card, .delivery-card, .reservation-card"
  );
  revealEls.forEach(el => revealObserver.observe(el));
  const counters = document.querySelectorAll("[data-count]");
  let countersStarted = false;
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting) && !countersStarted) {
      countersStarted = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute("data-count");
        const duration = 2000;
        const step = 16;
        const increment = target / (duration / step);
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target >= 1000
              ? (target / 1000).toFixed(1) + "k"
              : target + "+";
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current) + (target < 100 ? "+" : "");
          }
        }, step);
      });
    }
  }, { threshold: 0.4 });
  counters.forEach(c => counterObserver.observe(c));
  const testimonials = [
    {
      text: "A experiência no Apetito foi simplesmente incrível. Cada prato era uma surpresa agradável, com sabores que se complementavam perfeitamente. O serviço impecável e a atenção aos detalhes fazem toda a diferença.",
      name: "Giovana Diniz",
      role: "Crítica Gastronômica",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      text: "O melhor restaurante que já visitei em Belo Horizonte. O filé mignon estava perfeito e o atendimento foi excepcional. Voltarei com certeza!",
      name: "Carlos Mendes",
      role: "Cliente Frequente",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      text: "Celebramos nosso aniversário de casamento no Apetito e foi mágico. O chef preparou um menu especial e o sommelier sugeriu vinhos perfeitos. Memórias para toda a vida!",
      name: "Fernanda Gomes",
      role: "Cliente Frequente",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];
  let currentTestimonial = 0;
  const testimonialEl = document.querySelector(".testimonial");
  const dots = document.querySelectorAll(".dot");
  function goToTestimonial(index) {
    if (!testimonialEl) return;
    testimonialEl.style.opacity = "0";
    testimonialEl.style.transform = "translateY(20px)";
    setTimeout(() => {
      currentTestimonial = index;
      const t = testimonials[currentTestimonial];
      testimonialEl.querySelector(".testimonial-text").textContent = t.text;
      testimonialEl.querySelector(".author-img").src = t.image;
      testimonialEl.querySelector(".author-name").textContent = t.name;
      testimonialEl.querySelector(".author-role").textContent = t.role;
      testimonialEl.style.opacity = "1";
      testimonialEl.style.transform = "translateY(0)";
      dots.forEach((d, i) => d.classList.toggle("active", i === currentTestimonial));
    }, 400);
  }
  testimonialEl && (testimonialEl.style.transition = "all 0.5s ease");
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goToTestimonial(i));
  });
  if (testimonialEl) {
    setInterval(() => {
      const next = (currentTestimonial + 1) % testimonials.length;
      goToTestimonial(next);
    }, 5500);
  }
  if (document.getElementById("map")) {
    const lat = -19.9444;
    const lng = -44.3429;
    const map = L.map("map", {
      scrollWheelZoom: false,
      dragging: false,
      tap: false,
      zoomControl: false,
    }).setView([lat, lng], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    L.control.zoom({ position: "topright" }).addTo(map);
    const icon = L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
    L.marker([lat, lng], { icon }).addTo(map).bindPopup(`
      <div style="text-align:center; font-family:'Jost',sans-serif; padding: 8px;">
        <strong style="font-family:'Cormorant Garamond',serif; font-size: 1.1rem; color:#8b1a1a;">Apetito</strong><br>
        <span style="font-size:0.82rem; color:#666;">BR-262, KM 375 — Juatuba</span>
      </div>
    `);
    const mapEl = document.getElementById("map");
    mapEl.addEventListener("mouseenter", () => { map.scrollWheelZoom.enable(); map.dragging.enable(); });
    mapEl.addEventListener("mouseleave", () => { map.scrollWheelZoom.disable(); map.dragging.disable(); });
  }
  document.querySelectorAll(".tab-button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab + "-tab")?.classList.add("active");
    });
  });
  document.getElementById("work-resume")?.addEventListener("change", function (e) {
    const name = e.target.files[0]?.name || "Nenhum arquivo selecionado";
    document.getElementById("file-name").textContent = name;
    this.closest(".file-upload-label")?.classList.toggle("has-file", e.target.files.length > 0);
  });
  document.querySelectorAll("#contact-form, #work-form").forEach(form => {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const btnText = btn.querySelector(".btn-text");
      const spinner = btn.querySelector(".loading-spinner");
      btnText.style.opacity = "0";
      spinner.style.display = "inline-block";
      btn.disabled = true;
      try {
        const res = await fetch("https://formsubmit.co/ajax/contatoapetito@gmail.com", {
          method: "POST",
          body: new FormData(this),
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
        });
        const data = await res.json();
        if (data.success) {
          document.getElementById("success-modal").style.display = "flex";
          this.reset();
          if (this.id === "work-form") {
            document.getElementById("file-name").textContent = "Nenhum arquivo selecionado";
            document.querySelector(".file-upload-label")?.classList.remove("has-file");
          }
        } else {
          typeof showAlert === "function"
            ? showAlert("Erro", data.message || "Tente novamente", "error")
            : alert("Erro: " + (data.message || "Tente novamente"));
        }
      } catch {
        typeof showAlert === "function"
          ? showAlert("Erro de Conexão", "Tente novamente mais tarde.", "error")
          : alert("Erro de conexão. Tente mais tarde.");
      } finally {
        btnText.style.opacity = "1";
        spinner.style.display = "none";
        btn.disabled = false;
      }
    });
  });
  const chatbot = {
    init() {
      this.el = {
        trigger:   document.getElementById("chatbot-trigger"),
        container: document.getElementById("chatbot-container"),
        close:     document.getElementById("chatbot-close"),
        send:      document.getElementById("chatbot-send"),
        input:     document.getElementById("chatbot-input"),
        messages:  document.getElementById("chatbot-messages"),
      };
      if (!this.el.trigger) return;
      this.bindEvents();
      this.showWelcome();
    },
    bindEvents() {
      this.el.trigger.addEventListener("click", () => this.toggle());
      this.el.close.addEventListener("click",   () => this.hide());
      this.el.send.addEventListener("click",    () => this.send());
      this.el.input.addEventListener("keypress", e => {
        if (e.key === "Enter") this.send();
      });
    },
    toggle() {
      const visible = this.el.container.style.display === "flex";
      this.el.container.style.display = visible ? "none" : "flex";
      if (!visible) setTimeout(() => this.el.container.classList.add("visible"), 10);
      else this.el.container.classList.remove("visible");
    },
    hide() {
      this.el.container.style.display = "none";
      this.el.container.classList.remove("visible");
    },
    send() {
      const text = this.el.input.value.trim();
      if (!text) return;
      this.addMsg(text, "user");
      this.el.input.value = "";
      this.typing();
      setTimeout(() => {
        this.removeTyping();
        this.addMsg(this.respond(text), "bot");
      }, 900 + Math.random() * 600);
    },
    addMsg(text, sender) {
      const div = document.createElement("div");
      div.className = `message ${sender}-message`;
      div.textContent = text;
      this.el.messages.appendChild(div);
      this.el.messages.scrollTop = this.el.messages.scrollHeight;
    },
    typing() {
      const div = document.createElement("div");
      div.className = "typing-indicator";
      div.id = "typing-indicator";
      div.innerHTML = "<span class='typing-dot'></span><span class='typing-dot'></span><span class='typing-dot'></span>";
      this.el.messages.appendChild(div);
      this.el.messages.scrollTop = this.el.messages.scrollHeight;
    },
    removeTyping() {
      document.getElementById("typing-indicator")?.remove();
    },
    showWelcome() {
      setTimeout(() => {
        this.addMsg("Olá! Sou o assistente do Apetito 👋 Posso ajudar com cardápio, horários e reservas. Como posso ajudar?", "bot");
      }, 1200);
    },
    respond(input) {
      const t = input.toLowerCase();
      if (t.includes("cardápio") || t.includes("menu") || t.includes("prato"))
        return "Nosso cardápio inclui:\n• Risoto de Trufas — R$89\n• Filé Mignon — R$112\n• Sobremesa do Chef — R$45\n\nVeja o cardápio completo no site!";
      if (t.includes("horário") || t.includes("hora") || t.includes("funcionamento"))
        return "Horários:\n• Seg–Qui: 11h às 15h\n• Sex–Sáb: 11h às 23h\n• Dom: 11h às 20h";
      if (t.includes("reserva") || t.includes("mesa") || t.includes("agendar"))
        return "Para reservas:\n1. Use a seção 'Reservas' no site\n2. Ligue: (31) 1234-5678\n3. WhatsApp disponível no mesmo número";
      if (t.includes("endereço") || t.includes("local") || t.includes("onde"))
        return "Estamos em:\nBR-262, KM 375\nBoa Vista da Serra, Juatuba\n\nVeja o mapa na página!";
      if (t.includes("delivery") || t.includes("entrega") || t.includes("pedir"))
        return "Delivery das 11h às 22h\nApp ou tel: (31) 1234-5678\nTaxa: R$5 (grátis acima de R$80)";
      if (t.includes("evento") || t.includes("aniversário") || t.includes("casamento"))
        return "Realizamos eventos especiais:\n• Aniversários\n• Casamentos\n• Corporativos\n\nEntre em contato para personalizar!";
      return "Posso ajudar com:\n• Cardápio\n• Horários\n• Reservas\n• Localização\n• Delivery\n• Eventos\n\nO que deseja saber?";
    },
  };
  chatbot.init();
  document.querySelectorAll(".menu-item, .feature-card, .reservation-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
      card.style.transformStyle = "preserve-3d";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transformStyle = "";
    });
  });
  document.querySelectorAll(".menu-item").forEach((item, i) => {
    item.style.transitionDelay = `${i * 100}ms`;
  });
});
