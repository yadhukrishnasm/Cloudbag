import React from 'react';

export default function Cloudspell() {
    function validate(event) {
        event.preventDefault();
    
        var paradata = document.getElementById('paragraph').value;
    
        fetch('http://localhost:5000/grammacheck', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ para: paradata })
        }).then(response => response.json())
            .then(data => {
                const resultDiv = document.getElementById('results');
                resultDiv.innerHTML = ' ';
                const accuracy = document.getElementById('accuracy');
                accuracy.innerHTML = " ";
    
                if (Array.isArray(data)) {
                    let numWord = data.length;
                    let numErr = data.filter(each => each.word).length;
                    let errCode = numWord - numErr;
                    var percentageoferr = (errCode / numWord) * 100;
    
                    const Accuracy = document.createElement('meter');
                    Accuracy.value = errCode;
                    Accuracy.max = numWord;
                    document.getElementById("accuracy").innerHTML = percentageoferr.toFixed(1) + "% accuracy";
                    accuracy.appendChild(Accuracy);
    
                    const createCounter = () => {
                        let count = 0;
                        return () => {
                            return ++count;
                        };
                    };
                    const counter = createCounter();
    
                    if (numErr > 0) {
                        data.forEach(each => {
                            let no = counter();
    
                            const ul = document.createElement('ul');
                            const p = document.createElement('p');
                            const constainer = document.createElement('div');
                            const wordLi = document.createElement('li');
                            const messageLi = document.createElement('li');
                            const sentenceLi = document.createElement('li');
    
                            p.textContent = 'error : ' + no;
                            messageLi.textContent = `Message: ${each.message}`;
                            sentenceLi.textContent = `Sentence: ${each.sentence}`;
                            wordLi.textContent = `Word: ${each.word}`;
    
                            ul.append(messageLi);
                            ul.append(sentenceLi);
                            ul.append(wordLi);
                            constainer.append(p);
                            constainer.append(ul);
                            p.style.marginBottom = '0px';
                            resultDiv.appendChild(constainer);
                        });
                    } else {
                        resultDiv.innerHTML = '<h5>No grammar errors found.</h5>';
                    }
                } else {
                    console.error("Invalid response data format:", data);
                }
            })
            .catch(error => {
                console.log('Error checking grammar:', error);
            });
    }
    

  return (
    <div>
      <h1>Write Essay</h1><br />
      <textarea id="paragraph" name="para" placeholder="Try it" rows="10" cols="50" spellCheck="true"></textarea>
      <div id="accur-div">
        <div id="accuracy"></div>
      </div>
      <button id="verify" onClick={(e) => validate(e)}>Verify</button>
      <div id="results"></div>
    </div>
  );
}
