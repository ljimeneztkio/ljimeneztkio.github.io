document.addEventListener('DOMContentLoaded', () => {
  // --- MOBILE NAVIGATION ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navbar) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navbar.classList.toggle('open');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navbar.classList.remove('open');
      });
    });
  }

  // --- SCROLL ACTIVE HIGHLIGHT ---
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100; // Offset for header
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*=${sectionId}]`);
      
      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavigation);

  // --- SKILLS PROGRESS ANIMATION ---
  const progressBars = document.querySelectorAll('.skill-progress');
  
  // Store target width and reset to 0
  progressBars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = '0';
    bar.setAttribute('data-target-width', targetWidth);
  });

  const skillsSection = document.getElementById('skills');
  if (skillsSection && 'IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressBars.forEach(bar => {
            const target = bar.getAttribute('data-target-width');
            bar.style.width = target;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    skillsObserver.observe(skillsSection);
  } else {
    // Fallback if IntersectionObserver is not supported
    setTimeout(() => {
      progressBars.forEach(bar => {
        bar.style.width = bar.getAttribute('data-target-width');
      });
    }, 500);
  }

  // --- INTERACTIVE TERMINAL SIMULATOR ---
  const terminalCode = document.getElementById('terminal-code');
  const btnImprove = document.getElementById('btn-improve-code');
  const tabLegacy = document.getElementById('tab-legacy');
  const tabOptimized = document.getElementById('tab-optimized');
  const statusLight = document.getElementById('status-light');
  const statusMessage = document.getElementById('status-message');

  const legacyPHP = `<span class="comment">// Código PHP heredado (mysqli clásico y vulnerable)</span>
<span class="keyword">function</span> <span class="function">get_user</span>(<span class="variable">$id</span>) {
    <span class="variable">$conn</span> = <span class="function">mysqli_connect</span>(<span class="string">"localhost"</span>, <span class="string">"root"</span>, <span class="string">""</span>, <span class="string">"my_db"</span>);
    <span class="variable">$res</span> = <span class="function">mysqli_query</span>(<span class="variable">$conn</span>, <span class="string">"SELECT * FROM users WHERE id = "</span> . <span class="variable">$id</span>);
    <span class="variable">$user</span> = <span class="function">mysqli_fetch_assoc</span>(<span class="variable">$res</span>);
    <span class="keyword">return</span> <span class="variable">$user</span>;
}`;

  const optimizedPHP = `<span class="keyword">declare</span>(strict_types=1);

<span class="keyword">namespace</span> App\\Services;

<span class="keyword">use</span> App\\Models\\User;
<span class="keyword">use</span> App\\Database\\Connection;

<span class="keyword">class</span> <span class="type">UserService</span> 
{
    <span class="comment">/**
     * AI-Optimized & Secure PDO fetch (Antigravity AI Refactor)
     */</span>
    <span class="keyword">public function</span> <span class="function">getUserById</span>(<span class="type">int</span> <span class="variable">$id</span>): ?<span class="type">User</span> 
    {
        <span class="variable">$db</span> = <span class="type">Connection</span>::<span class="function">getInstance</span>()-><span class="function">getPdo</span>();
        <span class="variable">$stmt</span> = <span class="variable">$db</span>-><span class="function">prepare</span>(<span class="string">'SELECT id, name, email FROM users WHERE id = :id'</span>);
        <span class="variable">$stmt</span>-><span class="function">execute</span>([<span class="string">'id'</span> => <span class="variable">$id</span>]);
        
        <span class="variable">$data</span> = <span class="variable">$stmt</span>-><span class="function">fetch</span>();
        <span class="keyword">return</span> <span class="variable">$data</span> ? <span class="type">User</span>::<span class="function">fromArray</span>(<span class="variable">$data</span>) : <span class="keyword">null</span>;
    }
}`;

  // Initialize terminal code
  if (terminalCode) {
    terminalCode.innerHTML = legacyPHP;
  }

  // Optimize action
  if (btnImprove) {
    btnImprove.addEventListener('click', () => {
      // 1. Set loading status
      btnImprove.disabled = true;
      statusLight.className = 'status-indicator loading';
      statusMessage.textContent = 'Analizando estructura de código con Antigravity...';
      
      // Simulate code analysis steps
      setTimeout(() => {
        statusMessage.textContent = 'Inyectando tipado estricto y prevención de SQL Injection...';
      }, 1000);

      setTimeout(() => {
        statusMessage.textContent = 'Reescribiendo a programación orientada a objetos (POO)...';
      }, 2000);

      // 2. Load optimized code
      setTimeout(() => {
        terminalCode.style.opacity = '0';
        
        setTimeout(() => {
          terminalCode.innerHTML = optimizedPHP;
          terminalCode.style.opacity = '1';
          
          statusLight.className = 'status-indicator green';
          statusMessage.textContent = '¡Optimización exitosa! Refactorización aplicada.';
          
          tabOptimized.disabled = false;
          tabOptimized.classList.add('active');
          tabLegacy.classList.remove('active');
          
          btnImprove.style.display = 'none'; // Hide button or change text
        }, 300);

      }, 3000);
    });
  }

  // Tab switching
  if (tabLegacy && tabOptimized) {
    tabLegacy.addEventListener('click', () => {
      if (!tabLegacy.classList.contains('active')) {
        tabLegacy.classList.add('active');
        tabOptimized.classList.remove('active');
        terminalCode.innerHTML = legacyPHP;
        statusLight.className = 'status-indicator yellow';
        statusMessage.textContent = 'Mostrando código original sin optimizar.';
      }
    });

    tabOptimized.addEventListener('click', () => {
      if (!tabOptimized.classList.contains('active') && !tabOptimized.disabled) {
        tabOptimized.classList.add('active');
        tabLegacy.classList.remove('active');
        terminalCode.innerHTML = optimizedPHP;
        statusLight.className = 'status-indicator green';
        statusMessage.textContent = 'Mostrando código optimizado por Antigravity.';
      }
    });
  }
});
