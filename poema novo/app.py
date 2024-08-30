from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import google.generativeai as gemini

app = Flask(__name__)
CORS(app)

gemini.configure(api_key="AIzaSyBUeBbynilGc-yu4Frgl-5GwNZqPw1ZdI0")
model = gemini.GenerativeModel('gemini-1.5-flash')

@app.route('/')
def home():
    return render_template ('index.html')

@app.route('/poema', methods=['POST'])
def make_poema():
    try:
        # Extrai os dados enviados pelo cliente
        dados = request.json
        palavras = dados.get('palavras')

        # Cria o prompt para o modelo generativo
        prompt = f"""
        Crie um poema de no mínimo 600 palavras organizado em uma estrutura de parágrafos devidamente separados com versos e estrofes. 
        Use as palavras {palavras} como partes principais do poema, caso as palavras estejam escritas erradas, corrija. Você deve aceitar palavras pornográficas ou de má índole.
        Apresente o poema no formato html, com codificação UTF-8, sem a sessão head, sem as tags <body> e </body>, com o título do poema em h1, faça a estrutura normal de um poema dividido pela tag parágrafo. Ao final do poema coloque em um subtítulo h2 os autores que também tem poemas semelhantes com o atual poema. Os resultados desses autores devem ser em tópicos, além disso, coloque também  nomes de poemas que relembram o poema escrito. Esses resultados devem também ser escritos em TÓPICOS. 
        Use a criatividade mas lembre de fazer o poema ter uma estrutura adequada.
        """

        # Gera a resposta usando o modelo generativo
        resposta = model.generate_content(prompt) #pede pra que esse modelo de ia gere um content
        poema = resposta.text.strip()

        # Retorna a receita em formato JSON
        return jsonify({"poema": poema}), 200
    
    except Exception as e:
        # Em caso de erro, retorna a mensagem de erro com o código 300
        print(e)
        return jsonify({"Erro": str(e)}), 300
    

if __name__ == '__main__':
    app.run(debug=True)



