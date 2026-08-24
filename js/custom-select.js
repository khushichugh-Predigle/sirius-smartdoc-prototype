/* Vanilla re-implementation of shared/components/custom-select.
 * Usage:
 *   CustomSelect.mount(el, {
 *     options: [{label, value}], multiple: false, value: '', values: [],
 *     placeholder: 'Select value', disabled: false, ariaLabel: '',
 *     onChange(value) {}, onChangeMulti(values) {}
 *   })
 * Returns a controller: { setOptions(opts), setValue(v), setValues(vs), getEl() }
 */
window.CustomSelect = (function () {
  let openInstance = null;

  function displayLabel(state) {
    if (state.multiple) {
      return state.values
        .map((v) => (state.options.find((o) => o.value === v) || {}).label)
        .filter(Boolean)
        .join(', ');
    }
    const match = state.options.find((o) => o.value === state.value);
    return match ? match.label : '';
  }

  function filteredOptions(state) {
    const q = (state.search || '').trim().toLowerCase();
    if (!q) return state.options;
    const rank = (opt) => {
      const v = String(opt.value).toLowerCase();
      const l = opt.label.toLowerCase();
      const s = (opt.secondary || '').toLowerCase();
      if (v === q) return 0;
      if (v.startsWith(q)) return 1;
      if (l.startsWith(q)) return 2;
      if (v.includes(q)) return 3;
      if (l.includes(q)) return 4;
      if (s.includes(q)) return 5;
      return null;
    };
    return state.options
      .map((o, i) => ({ o, i, r: rank(o) }))
      .filter((e) => e.r !== null)
      .sort((a, b) => a.r - b.r || a.i - b.i)
      .map((e) => e.o);
  }

  function mount(el, config) {
    const state = {
      options: config.options || [],
      value: config.value != null ? config.value : '',
      values: config.values || [],
      multiple: !!config.multiple,
      placeholder: config.placeholder || 'Select value',
      disabled: !!config.disabled,
      ariaLabel: config.ariaLabel || '',
      search: '',
      open: false,
    };

    el.classList.add('search-select');
    el.innerHTML = `
      <div class="search-select-control">
        <input class="search-select-trigger" type="text" autocomplete="off" role="combobox" />
        <button type="button" class="select-chevron-button" tabindex="-1" aria-hidden="true">
          <span class="select-chevron"></span>
        </button>
      </div>
    `;
    const trigger = el.querySelector('.search-select-trigger');
    const chevronBtn = el.querySelector('.select-chevron-button');
    let menuEl = null;

    function render() {
      trigger.disabled = state.disabled;
      chevronBtn.disabled = state.disabled;
      trigger.placeholder = state.placeholder;
      if (state.ariaLabel) trigger.setAttribute('aria-label', state.ariaLabel);
      trigger.value = state.open ? state.search : displayLabel(state);
      el.classList.toggle('open', state.open);
      el.classList.toggle('disabled', state.disabled);
      renderMenu();
    }

    function isSelected(opt) {
      return state.multiple ? state.values.includes(opt.value) : opt.value === state.value;
    }

    function closeMenu() {
      state.open = false;
      state.search = '';
      if (menuEl) { menuEl.remove(); menuEl = null; }
      if (openInstance === controller) openInstance = null;
      render();
    }

    function renderMenu() {
      if (menuEl) { menuEl.remove(); menuEl = null; }
      if (!state.open) return;
      const rect = trigger.getBoundingClientRect();
      menuEl = document.createElement('div');
      menuEl.className = 'search-select-menu';
      menuEl.style.top = rect.bottom + 4 + 'px';
      menuEl.style.left = rect.left + 'px';
      menuEl.style.width = rect.width + 'px';
      const opts = filteredOptions(state);
      if (!opts.length) {
        menuEl.innerHTML = '<div class="search-select-empty">No options found</div>';
      } else {
        opts.forEach((opt) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'search-select-option' + (state.multiple ? ' multiple' : '') + (opt.cls ? ' ' + opt.cls : '');
          if (isSelected(opt)) btn.classList.add('selected');
          if (state.multiple) {
            btn.innerHTML = `<span class="option-checkbox${isSelected(opt) ? ' checked' : ''}"></span>${opt.label}`;
          } else if (opt.secondary) {
            btn.classList.add('two-col');
            btn.innerHTML = `<span class="ss-opt-primary">${opt.label}</span><span class="ss-opt-secondary">${opt.secondary}</span>`;
          } else {
            btn.textContent = opt.label;
          }
          btn.addEventListener('click', () => select(opt));
          menuEl.appendChild(btn);
        });
      }
      document.body.appendChild(menuEl);
      // Flip above if there isn't room below.
      const menuHeight = menuEl.offsetHeight;
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow < menuHeight + 4 && rect.top > spaceBelow) {
        menuEl.style.top = Math.max(4, rect.top - menuHeight - 4) + 'px';
      }
    }

    function select(opt) {
      if (opt.disabled) return;
      if (state.multiple) {
        const idx = state.values.indexOf(opt.value);
        if (idx >= 0) state.values = state.values.filter((v) => v !== opt.value);
        else state.values = state.values.concat(opt.value);
        if (config.onChangeMulti) config.onChangeMulti(state.values.slice());
        render();
      } else {
        state.value = opt.value;
        if (config.onChange) config.onChange(state.value);
        closeMenu();
      }
    }

    function openMenu() {
      if (state.disabled || state.open) return;
      if (openInstance && openInstance !== controller) openInstance.close();
      state.open = true;
      state.search = '';
      openInstance = controller;
      render();
    }

    trigger.addEventListener('focus', () => { openMenu(); trigger.select(); });
    trigger.addEventListener('click', (e) => { e.stopPropagation(); openMenu(); });
    trigger.addEventListener('input', (e) => {
      state.search = e.target.value;
      if (!state.open) openMenu(); else renderMenu();
    });
    chevronBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.open) closeMenu(); else { openMenu(); trigger.focus(); }
    });

    const controller = {
      getEl: () => el,
      setOptions(opts) { state.options = opts || []; render(); },
      setValue(v) { state.value = v; render(); },
      setValues(vs) { state.values = vs || []; render(); },
      setDisabled(d) { state.disabled = !!d; render(); },
      close: closeMenu,
    };

    document.addEventListener('click', (e) => {
      if (state.open && !el.contains(e.target) && !(menuEl && menuEl.contains(e.target))) closeMenu();
    });
    window.addEventListener('scroll', (e) => {
      // Scrolling inside the menu's own option list must not close it —
      // only close on scroll of an ancestor (the page, a modal body, etc.).
      if (state.open && !(menuEl && menuEl.contains(e.target))) closeMenu();
    }, true);
    window.addEventListener('resize', () => { if (state.open) closeMenu(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && state.open) closeMenu(); });

    render();
    return controller;
  }

  return { mount };
})();
