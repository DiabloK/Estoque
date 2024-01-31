document.addEventListener('DOMContentLoaded', function () {
  // Configurações do seu projeto Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDBcFYIEolp915_VqAM7_cVFo276CFb6r8",
    authDomain: "estoque-67be3.firebaseapp.com",
    projectId: "estoque-67be3",
    storageBucket: "estoque-67be3.appspot.com",
    messagingSenderId: "841476576997",
    appId: "1:841476576997:web:beadd0a0ccacda3c81a60c",
    measurementId: "G-F5PZ60NHZG"
  };

  // Inicializa o Firebase
  firebase.initializeApp(firebaseConfig);

  // Inicializa o Firestore
  const db = firebase.firestore();

  // Referência para a coleção 'colecao_itens' no seu Firestore
  const itensCollection = db.collection("Itens");
  // Evento de escuta para mudanças nos dados em tempo real
  itensCollection.onSnapshot((querySnapshot) => {
    // Limpa a lista antes de adicionar os novos itens
    $('#item-list').empty();

    // Itera sobre os documentos na coleção e adiciona na lista
    querySnapshot.forEach((doc) => {
      const item = doc.data();

      // Converta os campos que podem ter tipos diferentes para o formato desejado
      const quantidade = parseInt(item.Quantidade, 10); // Converte para número
      const valor = parseFloat(item.Valor); // Converte para número de ponto flutuante

      const listItem = `
              <li class="adobe-product">
                <div class="products">${item.Nome}</div>
                <span class="status">
                  <span id="logs" class="status-circle ${item.status === 'Updated' ? 'green' : 'red'}"></span>
                  ${item.status}
                </span>
                <div class="button-wrapper">
                  <button class="content-button status-button open">Open</button>
                  <div class="menu">
                    <button class="dropdown">
                      <ul>
                        <li><a href="#">Editar</a></li>
                        <li><a href="#">Excluir</a></li>
                      </ul>
                    </button>
                  </div>
                </div>
              </li>
            `;

      // Adiciona o item na lista
      $('#item-list').append(listItem);
    });
  });

  // Função para realizar a pesquisa no Firebase
  function searchFirebase(query) {
    const searchResultsDiv = document.getElementById("searchResults");

    // Limpar resultados anteriores
    searchResultsDiv.innerHTML = "";

    // Referência ao nó do Firebase que você deseja pesquisar
    const databaseRef = firebase.database().ref("/itens");

    // Executar a consulta
    databaseRef.orderByChild("itens").startAt(query).endAt(query + "\uf8ff").once("value")
      .then(snapshot => {
        // Processar os resultados da pesquisa
        snapshot.forEach(childSnapshot => {
          const data = childSnapshot.val();
          const listItem = document.createElement("li");
          listItem.textContent = data.Nome; // Substitua com o nome do campo no seu banco de dados
          searchResultsDiv.appendChild(listItem);
        });

        // Exibir os resultados
        searchResultsDiv.style.opacity = "1";
        searchResultsDiv.style.pointerEvents = "all";
      })
      .catch(error => {
        console.error("Erro ao buscar dados no Firebase:", error);
      });
  }
});
