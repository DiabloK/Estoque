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

    // Adiciona um novo documento com ID gerado automaticamente
    itensCollection.add({
        Tipo: "Padrão",
        Nome: "Item Padrão 1",
        Quantidade: 10,
        Valor: 100.00,
        Status: "Updated"
    });
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
                        <li><a href="#">Deletar</a></li>
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
});
