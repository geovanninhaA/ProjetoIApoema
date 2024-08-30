function updateRemoveButtons() {
    const RemoveButtons = document.querySelectorAll('.palavra-row .btn-danger');
    if (document.querySelectorAll('.palavra-row').length <= 3) {
        RemoveButtons.forEach(button => button.disabled = true);
    } else {
        RemoveButtons.forEach(button => button.disabled = false);
    }
}

function addPalavra() {
    const palavrasDiv = document.getElementById('palavras');
    const palavraRow = document.createElement('div');
    palavraRow.className = 'palavra-row';

    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'palavra form-control palavra-input';
    newInput.placeholder = 'Informe uma palavra impactante...';

    const removeButton = document.createElement('button');
    removeButton.className = 'btn-danger';
    removeButton.innerText = 'Excluir';
    removeButton.onclick = () => removePalavra(removeButton);

    palavraRow.appendChild(newInput);
    palavraRow.appendChild(removeButton);
    palavrasDiv.appendChild(palavraRow);

    updateRemoveButtons();
}

function removePalavra(button) {
    const palavraRow = button.parentElement;
    palavraRow.remove();
    updateRemoveButtons();
}

//Acionamento do botão de geração
async function submitForm () {
    const palavraInputs = document.getElementsByClassName('palavra');
    const responsegif = document.getElementById('gif')
    const responseenviar = document.getElementById('enviar')

    //Ações após o clique
    responsegif.style.display = 'inline-block'
    responseenviar.style.display = 'none'
    //responseDiv.style.display = 'none';
   

    const palavras = [];
    for (let i = 0; i < palavraInputs.length; i++) {
        if (palavraInputs[i].value) {
            palavras.push(palavraInputs[i].value);
        }
    }
    if (palavras.length < 3) {
        alert('Por favor, preencha pelo menos três campos!');
        return;
    }
    const data = {
        palavras: palavras
    };
    try {
        const response = await fetch('/poema', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
       
       
        const responseDiv = document.getElementById('response');
        if (result) {
            console.log(result)
            const poema = result.poema;
            responseDiv.innerHTML = poema;
        } else {
            responseDiv.innerHTML = `<p>Erro: ${result.Erro}</p>`;
        }
        responseDiv.style.display = 'block';

        //Ações após a geração
        responsegif.style.display = 'none'
        responseenviar.style.display = 'inline-block'
        
    
        
    } catch (error) {
        const responseDiv = document.getElementById('response');
        responseDiv.innerHTML = `<p>Erro: ${error.message}</p>`;
        responseDiv.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', updateRemoveButtons);