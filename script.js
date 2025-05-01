let selecionados = new Set();
const container = document.getElementById("lista-container"),
      btnConfirmar = document.getElementById("btn-confirmar");

function renderizarLista() {
  for (const categoria in lista) {
    const categoriaDiv = document.createElement("div");
    
    categoriaDiv.className = "section-title mt-4";
    categoriaDiv.textContent = categoria;
    container.appendChild(categoriaDiv);

    const itens = lista[categoria];

    if (Array.isArray(itens)) { renderSubcategoria("", itens); }
    else { for (const subcategoria in itens) { renderSubcategoria(subcategoria, itens[subcategoria]); } }
  }
}

function renderSubcategoria(subtitulo, itens) {
  const titulo = document.createElement("h5");
  
  titulo.className = "subsection-title";
  titulo.textContent = subtitulo;
  container.appendChild(titulo);

  itens.forEach(item => {
    const div = document.createElement("div");
    
    div.className = "form-check";

    const checkbox = document.createElement("input");
    
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input";
    checkbox.value = item;
    checkbox.id = item;

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {selecionados.add(item); }
      else { selecionados.delete(item); }
      
      btnConfirmar.classList.toggle("d-none", selecionados.size === 0);
    });

    const label = document.createElement("label");
    
    label.className = "form-check-label";
    label.setAttribute("for", item);
    label.textContent = item;
    div.appendChild(checkbox);
    div.appendChild(label);
    container.appendChild(div);
  });
}

renderizarLista();

const form = document.getElementById("form-confirmar");

form.addEventListener("submit", e => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const tel = document.getElementById("whatsapp").value.replace(/\D/g, "");
  const listaSelecionados = Array.from(selecionados).join(", ");
  const msg = `Oi! Eu sou ${nome} e vou levar os seguintes itens: ${listaSelecionados}`;

  window.open(`https://wa.me/55${tel}?text=${encodeURIComponent(msg)}`);
  window.open(`https://wa.me/5519989680054?text=${encodeURIComponent(msg)}`);
  
  selecionados.forEach(item => {
    const checkbox = document.getElementById(item);
    if (checkbox) { mcheckbox.closest(".form-check").remove(); }
  });
  
  selecionados.clear();
  btnConfirmar.classList.add("d-none");
  form.reset();
});
