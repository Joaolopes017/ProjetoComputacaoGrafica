import * as THREE from 'three';  

import { FBXLoader } from 'FBXLoader';

import { OrbitControls } from 'OrbitControls';



const cronometroElement = document.getElementById('cronometro');

let cronometroAtivo = false;
let tempoInicial;
let intervaloCronometro;
var cronometro = document.getElementById('cronometro');
var gameContainer = document.getElementById('gameContainer');
var buttonContainer = document.getElementById('buttonContainer');
var exitButton = document.getElementById('exitButton');
document.body.style.overflow = 'hidden';

document.getElementById('playButton').addEventListener('click', function() {
document.getElementById('menu').style.display = 'none';
document.getElementById('game').style.display = 'block';
myButton6.style.display = 'flex';
myButton10.style.display = 'none';
myButton11.style.display = 'none';
myButton12.style.display = 'none';
myButton13.style.display = 'none';
myButton.style.display = 'flex';
myButton2.style.display = 'flex';
myButton3.style.display = 'flex';
myButton8.style.display = 'flex';
speed = 0;
position = new THREE.Vector3(-6, -1.5, 0);
rotation = new THREE.Euler(0, 0, 0);
});

document.getElementById('tutorialButton').addEventListener('click', function() {
document.getElementById('menu').style.display = 'none';
document.getElementById('tutorial').style.display = 'block';
});

document.getElementById('backButton').addEventListener('click', function() {
document.getElementById('tutorial').style.display = 'none';
document.getElementById('menu').style.display = 'flex';

});
function startGame() {
  // document.getElementById('game').style.display = 'flex';
   gameContainer.style.display = 'block';
   buttonContainer.style.display = 'block';
   exitButton.style.display = 'block';
   podeMover = true;
   iniciarCronometro(); 
 }
 function menu()
{   
 document.getElementById('tutorial').style.display = 'none';
 document.getElementById('game').style.display = 'none';
 document.getElementById('menu').style.display = 'flex';
}
document.getElementById('myButton9').addEventListener('click', function() {
  
});
function iniciarCronometro() {
cronometroAtivo = true;
tempoInicial = Date.now();
intervaloCronometro = setInterval(atualizarCronometro, 1000);
}
function pararCronometro() {
cronometroAtivo = false;
clearInterval(intervaloCronometro);
cronometroElement.innerHTML = cronometroElement.innerHTML;;
}
function atualizarCronometro() {
const tempoAtual = Date.now() - tempoInicial;
const segundos = Math.floor(tempoAtual / 1000);
const minutos = Math.floor(segundos / 60);
const segundosRestantes = segundos % 60;
cronometroElement.innerHTML = `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
}

document.getElementById('exitButton').addEventListener('click', function() {
  document.getElementById('tutorial').style.display = 'none';
  document.getElementById('menu').style.display = 'flex';
  gameContainer.style.display = 'none';
  buttonContainer.style.display = 'none';
  exitButton.style.display = 'none'; 
  document.body.removeChild(this.mensagemVitoria);
  document.body.removeChild(this.botaoReiniciar);
  document.body.removeChild(this.botaoMenu);
  pararCronometro();
});




var playButton = document.getElementById('playButton');
playButton.addEventListener('click', startGame);
let luzAmbienteAtiva = false;
let ambientLight = null;
let ambientLight1 = null;
let luzDirecionalAtiva = false;
let directionalLight = null;
let luzPontualAtiva = false;
let luzSpotlightAtiva=true;
let fogEnabled = false;

let musicaAtiva=false;

let moveBackward = false;

let podeMover = true;
let desiredMoveForward = false;
let desiredMoveBackward = false;
let desiredTurnLeft = false;
let desiredTurnRight = false;
// definir a velocidade máxima
const maxSpeed = 1;

// definir a aceleração e desaceleração
const acceleration = 0.001;
const deceleration = 0.001;

// definir o atrito
const friction = 0.995;

// definir a velocidade atual
let speed = 0;

// definir a posição e a rotação do carro
let position = new THREE.Vector3(-6, -1.5, 0);
let rotation = new THREE.Euler(0, 0, 0);

  class BasicWorldDemo {
    constructor() {
      this.camera1 = null;
      this.camera2 = null;
      this.camera3 = null;
      this.currentCamera = null;
      this.walls = [];
      this._Initialize();
      this.ativa = false;
      this.tocouTrofeu = false;
      
      

    }
  
    _Initialize() {
      this._threejs = new THREE.WebGLRenderer({
        antialias: true,
      });
      this._threejs.shadowMap.enabled = true;
      this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
      this._threejs.setPixelRatio(window.devicePixelRatio);
      this._threejs.setSize(window.innerWidth, window.innerHeight);
  
      document.body.appendChild(this._threejs.domElement);

      this.currentCamera = new THREE.PerspectiveCamera();
      this.currentCamera = this._cameradinamica;
      
      window.addEventListener('keydown', (event) => {
        if (event.key === 'c') {
          this._switchCamera();
        }
      });

      window.addEventListener('resize', (event) => {
        this._OnWindowResize();
      }, false);
  
      this._scene = new THREE.Scene();
      this.scene2 = new THREE.Scene();
      this.currentScene = this._scene;

      

  //Textura Inicial Dia
  //const skyboxGeo = new THREE.BoxGeometry(10000, 10000,10000)
   const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './resources/posx.jpg',
        './resources/negx.jpg',
        './resources/posy.jpg',
        './resources/negy.jpg',
        './resources/posz.jpg',
        './resources/negz.jpg',
    ]);
    //let skybox = new THREE.Mesh(skyboxGeo, texture);
   // this._scene.add(skybox);
   this._scene.background = texture;
   this.scene2.background = texture;

//Botoes
//Luz Ambiente
let myButton = document.getElementById('myButton');
myButton.addEventListener('click',this.onButtonClick1.bind(this));
//Luz Direcional
let myButton2 = document.getElementById('myButton2');
myButton2.addEventListener('click',this.onButtonClick2.bind(this));
//Farois Maximos
let myButton3 = document.getElementById('myButton3');
myButton3.addEventListener('click',this.onButtonClick3.bind(this));
//botao dia
let myButton4 = document.getElementById('myButton4');
myButton4.addEventListener('click',this.onButtonClick4.bind(this));
//botao noite
let myButton5 = document.getElementById('myButton5');
myButton5.addEventListener('click',this.onButtonClick5.bind(this));
//botao nevoeiro
let myButton6 = document.getElementById('myButton6');
myButton6.addEventListener('click',this.onButtonClick6.bind(this));
//botao musica
let myButton7 = document.getElementById('myButton7');
myButton7.addEventListener('click',this.onButtonClick7.bind(this));
//botao Farois Medios
let myButton8 = document.getElementById('myButton8');
myButton8.addEventListener('click',this.onButtonClick8.bind(this));
//botao alterar carro
let myButton9 = document.getElementById('myButton9');
myButton9.addEventListener('click', function() {
  this.onButtonClick9();
  document.getElementById('tutorial').style.display = 'none';
  document.getElementById('menu').style.display = 'none';
  myButton6.style.display = 'none';
  myButton9.style.display = 'none';
  myButton10.style.display = 'flex';
  myButton11.style.display = 'flex';
  myButton12.style.display = 'flex';
  myButton13.style.display = 'flex';
  myButton.style.display = 'none';
  myButton2.style.display = 'none';
  myButton3.style.display = 'none';
  myButton8.style.display = 'none';
  podeMover = false;
  document.body.removeChild(this.mensagemVitoria);
  document.body.removeChild(this.botaoReiniciar);
  document.body.removeChild(this.botaoMenu);
  this.sound2.stop();
  speed = 0;
  this.tocouTrofeu=false;

}.bind(this));
//botao voltar
let myButton10 = document.getElementById('myButton10');
myButton10.addEventListener('click', function() {
  this.onButtonClick9();
  document.getElementById('tutorial').style.display = 'none';
  document.getElementById('menu').style.display = 'none';
  myButton6.style.display = 'flex';
  myButton9.style.display = 'flex';
  myButton10.style.display = 'none';
  myButton11.style.display = 'none';
  myButton12.style.display = 'none';
  myButton13.style.display = 'none';
  myButton.style.display = 'flex';
  myButton2.style.display = 'flex';
  myButton3.style.display = 'flex';
  myButton8.style.display = 'flex';
  podeMover = true; 
  
}.bind(this));
//botao carro azul
let myButton11 = document.getElementById('myButton11');
myButton11.addEventListener('click',this.onButtonClick11.bind(this));
//botao carro vermelho
let myButton12 = document.getElementById('myButton12');
myButton12.addEventListener('click',this.onButtonClick12.bind(this));

let myButton13 = document.getElementById('myButton13');
myButton13.addEventListener('click',this._animacao.bind(this));

    this._musica();
    this._musica2();
    this._musica3();
    this._ImportarTrofeu(); 
    this._ImportarOvelha(); 
    this._camera1pessoa();
    this._camera3pessoa();
    this._cameradinamica();
    this._cameraOrtografica();
    this._switchCamera();
    this._positionCamera();
    this._ground2();
    this._ground();
    this._car();
    this._car2();
    this._luzAmbiente2();
    this._luzAmbiente();
    this._luzDirecional();
    this._luzPontual();
    this._luzSpotlight();
    this._fundo();
    this._lab();
    this._MoveCar();  
    this._RAF();
  }

  _animacao() {
     
      this.sound3.play();
    
    this.car2.position.set(20, 0, 72);
    this.car2.rotation.set(0,0,0);
    let moveDistance = 1.9;

    //Primeira vez em frente
    let frente1 = setInterval(() => {
        this.car2.position.x -= moveDistance;
    }, 100);

    setTimeout(() => {
        clearInterval(frente1);

        //Rodar para primeira Curva      
        let girardireita1 = setInterval(() => {
          this.car2.rotation.y -= 0.4; //Girar para a direita
          this.car2.position.x -= 0.3;         
          this.car2.position.z -= 0.4;
          
        }, 50);
        setTimeout(() => {
            clearInterval(girardireita1);

            //Mover para a direita eixo X negativo        
            let direita1 = setInterval(() => {           
              this.car2.position.z -= 0.165;  
                      
            }, 8);
            setTimeout(() => {
              clearInterval(direita1);
  
              //Gira o carro para a direita y positivo
              let girardireita2 = setInterval(() => {
                  this.car2.rotation.y -= 0.45; 
                  this.car2.position.z += 0.2;
                  
                  
              }, 50);

              setTimeout(() => {
                clearInterval(girardireita2);
    
                //mover para baixo eixo x positivo
                let baixo1 = setInterval(() => {      
                  let moveDistance2 = 2.7;            
                    this.car2.position.x += moveDistance2; 
                    this.car2.position.z += 0.6;   
                }, 100);               
            setTimeout(() => {
                clearInterval(baixo1);

                //girar o carro para a esquerda
                let giraresquerda1 = setInterval(() => {
                  this.car2.rotation.y += 0.5;

                }, 50);
                    setTimeout(() => {
                    clearInterval(giraresquerda1);

                //mover direita 2 
                      let direita2 = setInterval(() => {
                        this.car2.position.z -= 3.3; 
                      }, 100);
                          setTimeout(() => {
                          clearInterval(direita2);

                          //girar o carro para a esquerda 2
                let giraresquerda2 = setInterval(() => {
                  this.car2.rotation.y += 0.5;
                }, 50);
                    setTimeout(() => {
                    clearInterval(giraresquerda2);

                    //esquerda 2 
                    let esquerda2 = setInterval(() => {
                      this.car2.position.x -= 1.8; 
                      this.car2.position.z += 1.6; 
                      
                    }, 100);
                        setTimeout(() => {
                        clearInterval(esquerda2);

                          //girar o carro para a direita 2
                              let giraresquerda2 = setInterval(() => {
                                this.car2.rotation.y -= 0.3;
                              }, 50);
                                  setTimeout(() => {
                                  clearInterval(giraresquerda2);

                                   //direita 3 
                                    let direita3 = setInterval(() => {
                                      this.car2.position.x -= 1.8; 
                                      this.car2.position.z -= 1.8;        
                                    }, 100);
                                        setTimeout(() => {
                                        clearInterval(direita3);

                                    //girar o carro para a direita 2
                                    let giraresquerda3 = setInterval(() => {
                                      this.car2.rotation.y += 0.3;
                                    }, 50);
                                        setTimeout(() => {
                                        clearInterval(giraresquerda3);

                                                  //esquerda3
                                             let esquerda3 = setInterval(() => {
                                                this.car2.position.x -= 1.2; 
                                              this.car2.position.z += 1.1;                                               
                                            }, 100);
                                              setTimeout(() => {
                                               clearInterval(esquerda3);

                                                      //girar o carro para a direita 2
                                            let girardireita3 = setInterval(() => {
                                              this.car2.rotation.y -= 0.3;
                                            }, 50);
                                                setTimeout(() => {
                                                clearInterval(girardireita3);

                                                     //direita 4
                                                          let direita4 = setInterval(() => {
                                                         this.car2.position.x -= 1; 
                                                         this.car2.position.z -= 0.6;                                                                                                 
                                                        }, 100);
                                                          setTimeout(() => {
                                                      clearInterval(direita4);

                                                      //girar o carro para a direita 3
                                                      let girardireita4 = setInterval(() => {
                                                        this.car2.rotation.y -= 0.3;
                                                        this.car2.position.x -= 0.1; 
                                                        this.car2.position.z -= 0.3;  
                                                      }, 50);
                                                          setTimeout(() => {
                                                          clearInterval(girardireita4);

                                                          //direita 5
                                                          let direita5 = setInterval(() => {
                                                            this.car2.position.z -= 2.2; 
                                                            this.car2.rotation.y -= 0.05;                                              
                                                           }, 100);
                                                             setTimeout(() => {
                                                         clearInterval(direita5);

                                                         //girar o carro para a direita 3
                                                      let girardireita6 = setInterval(() => {
                                                        this.car2.rotation.y -= 0.1;
                                                      }, 50);                                                     
                                                          setTimeout(() => {
                                                          clearInterval(girardireita6);

                                                          //tras 1
                                                          let tras1 = setInterval(() => {
                                                            this.car2.position.x += 7.5; 
                                                            this.car2.position.z += 0.1;                                           
                                                           }, 100);
                                                             setTimeout(() => {
                                                         clearInterval(tras1);

                                                           //girar o carro para a direita 3
                                                      let girardireita7 = setInterval(() => {
                                                        this.car2.rotation.y -= 0.4;
                                                      }, 50);                                                     
                                                          setTimeout(() => {
                                                          clearInterval(girardireita7);

                                                              //baixo2
                                                              let baixo2 = setInterval(() => {
                                                                this.car2.position.z += 7.2; 
                                                                this.car2.position.x -= 0.2;                                                                                                       
                                                              }, 100);
                                                                setTimeout(() => {
                                                              clearInterval(baixo2);

                                                               //girar o carro para a direita 3
                                                                  let girardireita8 = setInterval(() => {
                                                                    this.car2.rotation.y -= 0.4;
                                                                  }, 50);                                                     
                                                                      setTimeout(() => {
                                                                      clearInterval(girardireita8);

                                                                      //frente 2
                                                                        let frente2 = setInterval(() => {
                                                                          this.car2.position.x -= 3.5;                                                                                                      
                                                                        }, 100);
                                                                          setTimeout(() => {
                                                                        clearInterval(frente2);
                                                                        this.sound3.stop();
                                                                        },2000);
                                                                      }, 200)
                                                                  },2000);
                                                                }, 200)
                                                              },2000);
                                                            }, 200)
                                                          },2000);
                                                        }, 200)
                                                    },2000);
                                              }, 200);
                                          },2000);
                                        }, 200);
                                      },2000);
                                    }, 200);
                                },2000);
                              },200);
                          },2000);
                  }, 200);//girar esquerda
                },4000); // para baixo
              },200);//girar direita
            }, 3000);//para a direita
        }, 200);//cruva 
    }, 4500);//frente
    
}

_vitoria()
{
  
  //Mensagem
  this.mensagemVitoria = document.createElement('div');
  this.mensagemVitoria.textContent = 'Vitória';
  this.mensagemVitoria.style.position = 'absolute';
  this.mensagemVitoria.style.top = '250px';
  this.mensagemVitoria.style.left = '50%';
  this.mensagemVitoria.style.transform = 'translate(-50%, -50%)';
  this.mensagemVitoria.style.fontSize = '200px';
  this.mensagemVitoria.style.fontWeight='bold';
  this.mensagemVitoria.style.color='#0020d4';
  this.mensagemVitoria.style.textAlign= 'center';
  this.mensagemVitoria.style.textShadow=' 1px -1px 0 #2f5d87,  2px -2px 0 #2e5a83, 3px -3px 0 #2d5880,  4px -4px 0 #2b557c, 5px -5px 0 #2a5378,6px -6px 0 #295074,7px -7px 0 #274d71,8px -8px 0 #264b6d, 9px -9px 0 #254869,  10px -10px 0 #234665,11px -11px 0 #224361,12px -12px 0 #21405e, 13px -13px 12px rgba(0, 0, 0, 0.55),     13px -13px 1px rgba(0, 0, 0, 0.5)';
  document.body.appendChild(this.mensagemVitoria);
   //Imagem
   this.mensagemVitoria.style.backgroundImage = 'url(./Images/board.png)';
   this.mensagemVitoria.style.backgroundSize = 'cover';
   this.mensagemVitoria.style.backgroundPosition = 'center';

  //botao Menu
  this.botaoMenu = document.createElement('button');
  this.botaoMenu.textContent = 'Menu';
  this.botaoMenu.style.backgroundColor='red';
  this.botaoMenu.style.position = 'absolute';
  this.botaoMenu.style.top = '400px';
  this.botaoMenu.style.left = '50%';
  this.botaoMenu.style.transform = 'translate(-50%, -50%)';
  this.botaoMenu.style.marginTop= '20px';
  this.botaoMenu.style.padding= '10px 20px';
  this.botaoMenu.style.border= '2px solid green';
  this.botaoMenu.style.borderRadius= '15px';
  this.botaoMenu.style.color= 'white';
  this.botaoMenu.style.fontSize= '20px';
  this.botaoMenu.style.cursor= 'pointer';
  this.botaoMenu.style.fontWeight= 'bold';
  this.botaoMenu.addEventListener('click',this.menuJogo.bind(this))
  document.body.appendChild(this.botaoMenu);

  //botao reiniciar
  this.botaoReiniciar = document.createElement('button');
  this.botaoReiniciar.textContent = 'Reiniciar';
  this.botaoReiniciar.style.backgroundColor='red';
  this.botaoReiniciar.style.position = 'absolute';
  this.botaoReiniciar.style.top = '450px';
  this.botaoReiniciar.style.left = '50%';
  this.botaoReiniciar.style.transform = 'translate(-50%, -50%)';
  this.botaoReiniciar.style.marginTop= '20px';
  this.botaoReiniciar.style.padding= '10px 20px';
  this.botaoReiniciar.style.border= '2px solid green';
  this.botaoReiniciar.style.borderRadius= '15px';
  this.botaoReiniciar.style.color= 'white';
  this.botaoReiniciar.style.fontSize= '20px';
  this.botaoReiniciar.style.cursor= 'pointer';
  this.botaoReiniciar.style.fontWeight= 'bold';
  this.botaoReiniciar.addEventListener('click',this.reiniciarJogo.bind(this))
  document.body.appendChild(this.botaoReiniciar);
  exitButton.style.display = 'none';
  

}
reiniciarJogo() {

  document.body.removeChild(this.mensagemVitoria);
  document.body.removeChild(this.botaoReiniciar);
  document.body.removeChild(this.botaoMenu);
  this.sound2.stop();
  speed = 0;
  position = new THREE.Vector3(-6, -1.5, 0);
  rotation = new THREE.Euler(0, 0, 0);
  this.tocouTrofeu=false;
  startGame();
  podeMover = true;
  
  desiredMoveForward = false;
  desiredMoveBackward = false;
  desiredTurnLeft = false;
  desiredTurnRight = false;
}
menuJogo()
{
  document.body.removeChild(this.mensagemVitoria);
  document.body.removeChild(this.botaoReiniciar);
  document.body.removeChild(this.botaoMenu);
  menu();
  this.sound.stop();
  this.sound2.stop();
  
  speed = 0;

// definir a posição e a rotação do carro
position = new THREE.Vector3(-6, -1.5, 0);
rotation = new THREE.Euler(0, 0, 0);
this.tocouTrofeu=false;

}
onButtonClick9(){
  if (this.currentScene === this._scene) {
    this.currentScene = this.scene2;
} else {
    this.currentScene = this._scene;
}
}
  _musica() {
    this.listener1 = new THREE.AudioListener();
    const audioLoader = new THREE.AudioLoader();
    const audioFile = './Musica/Candyland.mp3';
    const sound = new THREE.Audio(this.listener1);
  
    audioLoader.load(audioFile, (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5); // Volume de (0 a 1)
      
    });
  
    this._scene.add(this.listener1);
  
    // Adicione o objeto `sound` como uma propriedade da instância da classe ou do objeto relevante
    // para que você possa acessá-lo posteriormente para parar a reprodução.
    this.sound = sound;
  }
  _musica2()
  {
    
  const listener2 = new THREE.AudioListener();
  const audioLoader = new THREE.AudioLoader();
  const audioFile = './Musica/WorldCup.mp3';
  const sound2 = new THREE.Audio(listener2);

  audioLoader.load(audioFile, (buffer) => {
    sound2.setBuffer(buffer);
    sound2.setLoop(true);
    sound2.setVolume(0.5); // Volume de (0 a 1)
  });

  this._scene.add(listener2);
  this.sound2 = sound2;
  }
  _musica3()
  {
    
  const listener3 = new THREE.AudioListener();
  const audioLoader = new THREE.AudioLoader();
  const audioFile = './Musica/Ovelha.mp3';
  const sound3 = new THREE.Audio(listener3);

  audioLoader.load(audioFile, (buffer) => {
    sound3.setBuffer(buffer);
    sound3.setLoop(true);
    sound3.setVolume(0.5); // Volume de (0 a 1)
  });

  this._scene.add(listener3);
  this.sound3 = sound3;
  }
  _ImportarTrofeu() {
   
      let importer = new FBXLoader();
      importer.load('./Models/source/wctrophy_lowpoly.fbx', (object) => {
        const textureLoader4 = new THREE.TextureLoader();
        const textureBaseColorBody = textureLoader4.load('./Models/textures/wctrophy_body_BaseColor.png');
        const textureMetallicBody = textureLoader4.load('./Models/textures/wctrophy_body_Metallic.png');
        const textureNormalBody = textureLoader4.load('./Models/textures/wctrophy_body_Normal.png');
        const textureRoughnessBody = textureLoader4.load('./Models/textures/wctrophy_body_Roughness.png');
        const textureBaseColorGlobe = textureLoader4.load('./Models/textures/wctrophy_globe_BaseColor.png');
        const textureNormalGlobe = textureLoader4.load('./Models/textures/wctrophy_globe_Normal.png');
        const textureRoughnessGlobe = textureLoader4.load('./Models/textures/wctrophy_globe_Roughness.png');
    
        const materialCup = [ 
          new THREE.MeshStandardMaterial({ map: textureBaseColorGlobe, normalMap: textureNormalGlobe, roughnessMap: textureRoughnessGlobe, map: textureBaseColorBody, normalMap: textureNormalBody, roughnessMap: textureRoughnessBody, roughness: 0.5 ,metalnessMap: textureMetallicBody, metalness: 0.5}),
        ];
    
        object.traverse(function (child) {
          if (child.isMesh) {
            child.material = materialCup[0]; 
            child.material.needsUpdate = true;
            child.castShadow = true;
            child.receiveShadow = true;            
            child.geometry.computeBoundingBox();  
          }
        });
    
        this._scene.add(object);  
        object.scale.set(0.01, 0.01, 0.01);
        //object.position.set(1, -2.39999, 1);
        object.position.set(60, -2.39999, -62.5);  
        this.worldCupObject = object;
        
        this.worldCupBoundingBox = new THREE.Box3();

        this.worldCupBoundingBox = new THREE.Box3().setFromObject(object);
        
        //const worldCupBoundingBoxHelper = new THREE.Box3Helper(this.worldCupBoundingBox, 0x00ff00);
        //this._scene.add(worldCupBoundingBoxHelper);
  
      
      
    });
  }
  _ImportarOvelha() {
    let importer = new FBXLoader();
    importer.load('./Model2/source/sheep-rigged.fbx', (object) => {
      const textureLoader4 = new THREE.TextureLoader();
      const textureAOOvelha = textureLoader4.load('./Model2/textures/sheep_AO.png');
      const textureGroundOvelha = textureLoader4.load('./Model2/textures/internal_ground_ao_texture.jpeg');
      const textureDiffuseOvelha = textureLoader4.load('./Model2/textures/sheep_Diffuse.png');
      const textureNormalOvelha = textureLoader4.load('./Model2/textures/sheep_Normal.png');
      const textureRoughnessOvelha = textureLoader4.load('./Model2/textures/sheep_Roughness.png');
  
      const materialOvelha = [
        new THREE.MeshStandardMaterial({
          map: textureDiffuseOvelha,
          normalMap: textureNormalOvelha,
          roughnessMap: textureRoughnessOvelha,
          aoMap: textureAOOvelha
        })
      ];
  
      object.traverse(function (child) {
        if (child.isMesh) {
          child.material = materialOvelha[0];
          child.material.needsUpdate = true;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
  
      this.scene2.add(object);
      object.scale.set(0.02, 0.02, 0.02);
      object.position.set(-50, -2.4, 45);
  
      // Função para fazer o objeto e os clones saltarem
      function jump(object) {
        let positionY = object.position.y;
        let targetY = positionY + 2;
        let direction = 1;
  
        let interval = setInterval(() => {
          object.position.y += direction * 2;
  
          if (object.position.y >= targetY || object.position.y <= positionY) {
            direction *= -1;
          }
        }, 100);
  
        setTimeout(() => {
          clearInterval(interval);
          object.position.set(-50, -2.4, 45);
          jump(object);
        }, 400000);
      }
  
      // Chamar a função de salto para o objeto principal
      jump(object);
  
      // Clonar o objeto e adicionar os clones à cena
      let clone = object.clone();
      clone.position.set( 30, -2.4, 10);
      clone.traverse(function (child) {
        if (child.isMesh) {
          child.material = materialOvelha[0].clone();
          child.material.needsUpdate = true;
        }
      });
      this.scene2.add(clone);
      jump(clone);
      // Clonar o objeto e adicionar os clones à cena
      let clone1 = object.clone();
      clone1.position.set( -50, -2.4, -50);
      clone1.traverse(function (child) {
        if (child.isMesh) {
          child.material = materialOvelha[0].clone();
          child.material.needsUpdate = true;
        }
      });
      this.scene2.add(clone1);
      jump(clone1);
  
      let clone2 = object.clone();
      clone2.position.set(-28, -2.4, -7);
      clone2.traverse(function (child) {
        if (child.isMesh) {
          child.material = materialOvelha[0].clone();
          child.material.needsUpdate = true;
        }
      });
      this.scene2.add(clone2);
      jump(clone2);
    
     let clone3 = object.clone();
      clone3.position.set( 5, -2.4, -35);
      clone3.traverse(function (child) {
        if (child.isMesh) {
          child.material = materialOvelha[0].clone();
          child.material.needsUpdate = true;
        }
      });
      this.scene2.add(clone3);
      jump(clone3); 

      let clone4 = object.clone();
      clone4.position.set( 58, -2.4, -56);
      clone4.traverse(function (child) {
        if (child.isMesh) {
          child.material = materialOvelha[0].clone();
          child.material.needsUpdate = true;
        }
      });
      this.scene2.add(clone4);
      jump(clone4); 

      let clone5 = object.clone();
      clone5.position.set( 55, -2.4, 53);
      clone5.traverse(function (child) {
        if (child.isMesh) {
          child.material = materialOvelha[0].clone();
          child.material.needsUpdate = true;
        }
      });
      this.scene2.add(clone5);
      jump(clone5);
      
      let clone6 = object.clone();
      clone6.position.set( 15, -2.4, 60);
      clone6.traverse(function (child) {
        if (child.isMesh) {
          child.material = materialOvelha[0].clone();
          child.material.needsUpdate = true;
        }
      });
      this.scene2.add(clone6);
      jump(clone6);

      let clone7 = object.clone();
      clone7.position.set (15, -2.4, 95);
      clone7.rotation.y = Math.PI ;
      clone7.traverse(function (child) {
        if (child.isMesh) {
          child.material = materialOvelha[0].clone();
          child.material.needsUpdate = true;
        }
      });
      this.scene2.add(clone7);
      jump(clone7);

      let clone8 = object.clone();
      clone8.position.set ( -95, -2.4, -95);
      clone8.rotation.y = Math.PI/3 ;
      clone8.traverse(function (child) {
        if (child.isMesh) {
          child.material = materialOvelha[0].clone();
          child.material.needsUpdate = true;
        }
      });
      this.scene2.add(clone8);
      jump(clone8);

      let clone9 = object.clone();
      clone9.position.set ( -95, -2.4, 95);
      clone9.rotation.y = Math.PI/1.3;
      clone9.traverse(function (child) {
        if (child.isMesh) {
          child.material = materialOvelha[0].clone();
          child.material.needsUpdate = true;
        }
      });
      this.scene2.add(clone9);
      jump(clone9);

      let clone10 = object.clone();
      clone10.position.set ( 95, -2.4, 95);
      clone10.rotation.y = -Math.PI/0.35;
      clone10.traverse(function (child) {
        if (child.isMesh) {
          child.material = materialOvelha[0].clone();
          child.material.needsUpdate = true;
        }
      });
      this.scene2.add(clone10);
      jump(clone10);

      let clone11 = object.clone();
      clone11.position.set ( 95, -2.4, -95);
      clone11.rotation.y = Math.PI/-3 ;
      clone11.traverse(function (child) {
        if (child.isMesh) {
          child.material = materialOvelha[0].clone();
          child.material.needsUpdate = true;
        }
      });
      this.scene2.add(clone11);
      jump(clone11);
 
    
  });
}

  _luzAmbiente2() {

    
      ambientLight1 = new THREE.AmbientLight(0xffffff, 1); // cor branca, intensidade 0.5
      this.scene2.add(ambientLight1);
    }
  
//botao luz ambiente
  onButtonClick1() {
    // Inverte o estado atual da luz ambiente
    luzAmbienteAtiva = !luzAmbienteAtiva;
  
    if (luzAmbienteAtiva) {
      // Ativa a luz ambiente
      this._luzAmbiente();
    } else {
      // Desativa a luz ambiente
      this._desativarLuzAmbiente();
    }
  }
  _luzAmbiente() {

    if (!ambientLight) {
      ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // cor branca, intensidade 0.5
      ambientLight.name = "ambient";
      this._scene.add(ambientLight);
    }
  } 
  _desativarLuzAmbiente() {
    if (ambientLight) {
      this._scene.remove(ambientLight);
      ambientLight = null;
    }
  }
//botao luz pontual
onButtonClick3() {
  luzPontualAtiva = !luzPontualAtiva;

  if (luzPontualAtiva) {
    this._luzPontual();
  } else {
    this._desativarLuzPontual();
  }
}
// Método para ativar a luz pontual
_luzPontual() {
  if (this.pointLight1 && this.pointLight2) {
    // Ativa as luzes pontuais
    this.pointLight1.visible = true;
    this.pointLight2.visible = true;
  } else {
    // Cria e adiciona as luzes pontuais
    this.pointLight1 = new THREE.PointLight(0xffffff, 1.5, 80, 0.5);
    this.pointLight2 = new THREE.PointLight(0xffffff, 1.5, 80, 0.5);
    this.pointLight1.scale.set(0.3, 0.3, 0.3);
    this.pointLight2.scale.set(0.3, 0.3, 0.3);
    this.pointLight1.castShadow = true;
    this.pointLight2.castShadow = true;
    


    // Posiciona as luzes pontuais nos faróis
    this.farol1.add(this.pointLight1);
    this.farol2.add(this.pointLight2);
    this.pointLight1.position.set(this.farol1.position.x - 25,this.farol1.position.y+2.5,this.farol1.position.z );
    this.pointLight2.position.set(this.farol2.position.x - 25,this.farol2.position.y +2.5,this.farol2.position.z );
  }
  }
// Método para desativar a luz pontual
_desativarLuzPontual() {
  if (this.pointLight1 && this.pointLight2) {
    // Desativa as luzes pontuais
    this.pointLight1.visible = false;
    this.pointLight2.visible = false;
  }
}
//botao luz spotlight
onButtonClick8() {
  luzSpotlightAtiva = !luzSpotlightAtiva;

  if (luzSpotlightAtiva) {
    this._luzSpotlight();
  } else {
    this._desativarLuzSpotlight();
  }
}
// Método para ativar a luz Spotlight
_luzSpotlight(){
  this.spotLight1 = new THREE.SpotLight(0xffffff, 2, 100, THREE.MathUtils.degToRad(40), 0.25);
  this.spotLight2 = new THREE.SpotLight(0xffffff, 2, 100, THREE.MathUtils.degToRad(40), 0.25);
  this.spotLightTraseiro1 = new THREE.SpotLight(0xFF0000, 1, 25, THREE.MathUtils.degToRad(70), 0.25);
  this.spotLightTraseiro2 = new THREE.SpotLight(0xFF0000, 1, 25, THREE.MathUtils.degToRad(70), 0.25);
  this.spotLightTraseiroMarchaAtras1 = new THREE.SpotLight(0xFFFFFF, 1.5, 45, THREE.MathUtils.degToRad(40), 0.25);
  this.spotLightTraseiroMarchaAtras2 = new THREE.SpotLight(0xFFFFFF, 1.5, 45, THREE.MathUtils.degToRad(40), 0.25);

  this.spotLight1.castShadow = true;
  this.spotLight2.castShadow = true;
  this.spotLightTraseiro1.castShadow = true;
  this.spotLightTraseiro2.castShadow = true;
  this.spotLightTraseiroMarchaAtras1.castShadow = true;
  this.spotLightTraseiroMarchaAtras2.castShadow = true;

  this.spotLight1.position.set(this.farol1.position.x + .2, this.farol1.position.y, this.farol1.position.z - .2);
  this.spotLight2.position.set(this.farol2.position.x + .2, this.farol2.position.y, this.farol2.position.z + .2);
  this.spotLightTraseiro1.position.set(this.farolTraseiroDireitos[1].position.x + .2, this.farolTraseiroDireitos[1].position.y, this.farolTraseiroDireitos[1].position.z);
  this.spotLightTraseiro2.position.set(this.farolTraseiroEsquerdos[1].position.x + .2, this.farolTraseiroEsquerdos[1].position.y, this.farolTraseiroEsquerdos[1].position.z);
  this.spotLightTraseiroMarchaAtras1.position.set(this.farolTraseiroDireitos[0].position.x + .2, this.farolTraseiroDireitos[0].position.y , this.farolTraseiroDireitos[0].position.z);
  this.spotLightTraseiroMarchaAtras2.position.set(this.farolTraseiroEsquerdos[0].position.x + .2, this.farolTraseiroEsquerdos[0].position.y , this.farolTraseiroEsquerdos[0].position.z);

  this.target1 = new THREE.Object3D();
  this.target2 = new THREE.Object3D();
  this.targetTraseiroDireito = new THREE.Object3D();
  this.targetTraseiroEsquerdo = new THREE.Object3D();
  this.targetMarchaAtras1 = new THREE.Object3D();
  this.targetMarchaAtras2 = new THREE.Object3D();

  this.target1.position.set(this.farol1.position.x - .5, this.farol1.position.y , this.farol1.position.z );
  this.target2.position.set(this.farol2.position.x - .5, this.farol2.position.y , this.farol2.position.z );
  this.targetTraseiroDireito.position.set(this.farolTraseiroDireitos[1].position.x + .5, this.farolTraseiroDireitos[1].position.y - .1 , this.farolTraseiroDireitos[1].position.z);
  this.targetTraseiroEsquerdo.position.set(this.farolTraseiroEsquerdos[1].position.x + .5, this.farolTraseiroEsquerdos[1].position.y - .1, this.farolTraseiroEsquerdos[1].position.z);
  this.targetMarchaAtras1.position.set(this.farolTraseiroDireitos[0].position.x + .5, this.farolTraseiroDireitos[0].position.y, this.farolTraseiroDireitos[0].position.z);
  this.targetMarchaAtras2.position.set(this.farolTraseiroEsquerdos[0].position.x + .5, this.farolTraseiroEsquerdos[0].position.y, this.farolTraseiroEsquerdos[0].position.z);
  
  this.spotLight1.target = this.target1;
  this.spotLight2.target = this.target2;
  this.spotLightTraseiro1.target = this.targetTraseiroDireito;
  this.spotLightTraseiro2.target = this.targetTraseiroEsquerdo;
  this.spotLightTraseiroMarchaAtras1.target = this.targetMarchaAtras1;
  this.spotLightTraseiroMarchaAtras2.target = this.targetMarchaAtras2;


  this.car.add(this.spotLight1, this.target1);
  this.car.add(this.spotLight2, this.target2);
  this.car.add(this.spotLightTraseiro1, this.targetTraseiroDireito);
  this.car.add(this.spotLightTraseiro2, this.targetTraseiroEsquerdo);
  this.car.add(this.spotLightTraseiroMarchaAtras1, this.targetMarchaAtras1);
  this.car.add(this.spotLightTraseiroMarchaAtras2, this.targetMarchaAtras2);

  this.spotLightTraseiroMarchaAtras1.visible = false;
  this.spotLightTraseiroMarchaAtras2.visible = false;
}
// Método para desativar a luz Spotlight
_desativarLuzSpotlight() {
  if (this.spotLight1 && this.spotLight2) {
    // Desativa as luzes Spotlight
    this.spotLight1.visible = false;
    this.spotLight2.visible = false;
  }
}
  onButtonClick2() {
    luzDirecionalAtiva = !luzDirecionalAtiva;
  
    if (luzDirecionalAtiva) {
      this._luzDirecional();
    } else {
      this._desativarLuzDirecional();
    }
  } 
  _luzDirecional() {
    if (!directionalLight) {
      directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // cor branca, intensidade 0.5
      directionalLight.name = "directional";
  
      // Configuração das sombras
      directionalLight.castShadow = true;
      directionalLight.shadow.bias = -0.001;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.near = 0.1;
      directionalLight.shadow.camera.far = 500.0;
      directionalLight.shadow.camera.left = -100;
      directionalLight.shadow.camera.right = 100;
      directionalLight.shadow.camera.top = 100;
      directionalLight.shadow.camera.bottom = -100;
  
      this._scene.add(directionalLight);
    }
  }
  _desativarLuzDirecional() {
    if (directionalLight) {
      this._scene.remove(directionalLight);
      directionalLight = null;
    }
  }
  //Botao Textura Noite
  onButtonClick4() {
    const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    './resources/Noitenegz.png',
    './resources/Noiteposz.png',
    './resources/Noiteposy.png',
    './resources/Noitenegy.png',
    './resources/Noitenegx.jpg',
    './resources/Noiteposx.png',
]);
this._scene.background = texture;
this.scene2.background = texture;
  }
  //Botao Textura Dia
  onButtonClick5() {
    const loader = new THREE.CubeTextureLoader();
      const texture = loader.load([
          './resources/posx.jpg',
          './resources/negx.jpg',
          './resources/posy.jpg',
          './resources/negy.jpg',
          './resources/posz.jpg',
          './resources/negz.jpg',
      ]);
      this._scene.background = texture;
      this.scene2.background = texture;
  }
  //Nevoeiro
  onButtonClick6() {
    fogEnabled = !fogEnabled;

    if (fogEnabled) {
      this._scene.fog = new THREE.FogExp2(0xabaeb0, 0.05);
    } else {
      this._scene.fog = null;
    }
  }
  //Botao Musica
  onButtonClick7()
  {
    musicaAtiva = !musicaAtiva;
  
    if (this.sound.isPlaying) {
      this.sound.stop();
    } else {
      this.sound.play();
    }
  }
  _ground2()
{
 //chão
 const textureLoader = new THREE.TextureLoader();
 const planeTexture1 = textureLoader.load('Images/mapaEstrada.png');
 


 const planeMaterial = new THREE.MeshStandardMaterial({ map: planeTexture1});
// const planeMaterial = new THREE.MeshStandardMaterial({ map: planeTexture, side: THREE.DoubleSide });

 const plane = new THREE.Mesh(
     new THREE.PlaneGeometry(200, 200, 150, 150),
     planeMaterial
 );
 this._ground2 = new THREE.Object3D();
 this._ground2.add(plane);
 plane.castShadow = false;
 plane.receiveShadow = true;
 plane.rotation.x = -Math.PI / 2;
 plane.position.set(0,-2.4,0);
 this.scene2.add(plane);
}
_ground()
{
 //chão
 const textureLoader = new THREE.TextureLoader();
 const planeTexture1 = textureLoader.load('./Ground/Stylized_Stone_Floor_003_ambientOcclusion.jpg');
 const planeTexture2 = textureLoader.load('./Ground/Stylized_Stone_Floor_003_basecolor.jpg');
 const planeTexture3 = textureLoader.load('./Ground/Stylized_Stone_Floor_003_height.png');
 const planeTexture4 = textureLoader.load('./Ground/Stylized_Stone_Floor_003_normal.jpg');
 const planeTexture5 = textureLoader.load('./Ground/Stylized_Stone_Floor_003_roughness.jpg');
 planeTexture2.wrapS = THREE.RepeatWrapping;
 planeTexture2.wrapT = THREE.RepeatWrapping;
 planeTexture2.repeat.set(50,50);
 planeTexture1.wrapS = THREE.RepeatWrapping;
 planeTexture1.wrapT = THREE.RepeatWrapping;
 planeTexture1.repeat.set(50,50);
 planeTexture3.wrapS = THREE.RepeatWrapping;
 planeTexture3.wrapT = THREE.RepeatWrapping;
 planeTexture3.repeat.set(50,50);
 planeTexture4.wrapS = THREE.RepeatWrapping;
 planeTexture4.wrapT = THREE.RepeatWrapping;
 planeTexture4.repeat.set(50,50);
 planeTexture5.wrapS = THREE.RepeatWrapping;
 planeTexture5.wrapT = THREE.RepeatWrapping;
 planeTexture5.repeat.set(50,50);

 const planeMaterial = new THREE.MeshStandardMaterial({ color: 'grey', map: planeTexture2, normalMap: planeTexture4, roughnessMap: planeTexture5, aoMap: planeTexture1, displacementMap: planeTexture3, displacementScale: 0.2,side: THREE.DoubleSide});
// const planeMaterial = new THREE.MeshStandardMaterial({ map: planeTexture, side: THREE.DoubleSide });

 const plane = new THREE.Mesh(
     new THREE.PlaneGeometry(400, 400, 300, 300),
     planeMaterial
 );
 this._ground = new THREE.Object3D();
 this._ground.add(plane);
 plane.castShadow = false;
 plane.receiveShadow = true;
 plane.rotation.x = -Math.PI / 2;
 plane.position.set(0,-2.4,0);
 this._scene.add(plane);
}

_fundo() {
  // Carregar as texturas
  const textureLoader = new THREE.TextureLoader();
  const trunkTexture = textureLoader.load('./Images/tronco.jpg');
  const leavesTexture = textureLoader.load('./Images/folhas.jpg');
  const wallTexture = textureLoader.load('./Images/muralha.jpg');
  const wallTexture1 = textureLoader.load('Muralha/Substance_graph_AmbientOcclusion.jpg');
  const wallTexture2 = textureLoader.load('Muralha/Substance_graph_BaseColor.jpg');
  const wallTexture3 = textureLoader.load('Muralha/Substance_graph_Height.png');
  const wallTexture4 = textureLoader.load('Muralha/Substance_graph_Normal.jpg');
  const wallTexture5 = textureLoader.load('Muralha/Substance_graph_Roughness.jpg');
  wallTexture2.wrapS = THREE.RepeatWrapping;
  wallTexture2.wrapT = THREE.RepeatWrapping;
  wallTexture2.repeat.set(5,5);
  wallTexture1.wrapS = THREE.RepeatWrapping;
  wallTexture1.wrapT = THREE.RepeatWrapping;
  wallTexture1.repeat.set(5,5);
  wallTexture3.wrapS = THREE.RepeatWrapping;
  wallTexture3.wrapT = THREE.RepeatWrapping;
  wallTexture3.repeat.set(5,5);
  wallTexture4.wrapS = THREE.RepeatWrapping;
  wallTexture4.wrapT = THREE.RepeatWrapping;
  wallTexture4.repeat.set(5,5);
  wallTexture5.wrapS = THREE.RepeatWrapping;
  wallTexture5.wrapT = THREE.RepeatWrapping;
  wallTexture5.repeat.set(5,5);

  const roofTexture = textureLoader.load('./Images/telhado.jpg');
  const folhasTexture1 = textureLoader.load('Folhas/Stylized_Leaves_002_ambientOcclusion.jpg');
 const folhasTexture2 = textureLoader.load('Folhas/Stylized_Leaves_002_basecolor.jpg');
 const folhasTexture3 = textureLoader.load('Folhas/Stylized_Leaves_002_height.png');
 const folhasTexture4 = textureLoader.load('Folhas/Stylized_Leaves_002_normal.jpg');
 const folhasTexture5 = textureLoader.load('Folhas/Stylized_Leaves_002_roughness.jpg');

 folhasTexture2.wrapS = THREE.RepeatWrapping;
 folhasTexture2.wrapT = THREE.RepeatWrapping;
 folhasTexture2.repeat.set(5,5);
 folhasTexture1.wrapS = THREE.RepeatWrapping;
 folhasTexture1.wrapT = THREE.RepeatWrapping;
 folhasTexture1.repeat.set(5,5);
 folhasTexture3.wrapS = THREE.RepeatWrapping;
 folhasTexture3.wrapT = THREE.RepeatWrapping;
 folhasTexture3.repeat.set(5,5);
 folhasTexture4.wrapS = THREE.RepeatWrapping;
 folhasTexture4.wrapT = THREE.RepeatWrapping;
 folhasTexture4.repeat.set(5,5);
 folhasTexture5.wrapS = THREE.RepeatWrapping;
 folhasTexture5.wrapT = THREE.RepeatWrapping;
 folhasTexture5.repeat.set(5,5);
  // Criar materiais com texturas
  const trunkMat = new THREE.MeshStandardMaterial({ map: trunkTexture });
  const leavesMat = new THREE.MeshStandardMaterial({ map: folhasTexture2, normalMap: folhasTexture4, roughnessMap: folhasTexture5, aoMap: folhasTexture1, displacementMap: folhasTexture3, displacementScale: 0});
  const wallMat = new THREE.MeshStandardMaterial({ map: wallTexture2, normalMap: wallTexture4, roughnessMap: wallTexture5, aoMap: wallTexture1, displacementMap: wallTexture3, displacementScale: 0});
  const roofMat = new THREE.MeshStandardMaterial({ map: roofTexture });

  // Use CylinderGeometry para o tronco da árvore, com mais segmentos radiais para um tronco mais arredondado
  const trunkGeo = new THREE.CylinderGeometry(0.5, 0.5, 2, 16);

  // Use ConeGeometry para as folhas da árvore
  const leavesGeo = new THREE.ConeGeometry(0.8, 1.5, 12);

  // Use BoxGeometry para as muralhas
  const wallGeo = new THREE.BoxGeometry(1, 12, 1);

  const minX = -100; // Valor mínimo para a coordenada x
  const maxX = 100;  // Valor máximo para a coordenada x
  const minZ = -100; // Valor mínimo para a coordenada z
  const maxZ = 100;  // Valor máximo para a coordenada z

  const emptyMinX = -80; // Limites do quadrado vazio no centro
  const emptyMaxX = 80;
  const emptyMinZ = -80;
  const emptyMaxZ = 80;

  // Lista de posições de árvores
  let treePositions = [];

  // Define a distância mínima entre as árvores
  const minTreeDistance = 10;


  // Criação das árvores
  for (let i = 0; i < 120; i++) {  // Número de árvores
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    const leaves = new THREE.Mesh(leavesGeo, leavesMat);

    let randomX, randomZ, tooClose;

    do {
      tooClose = false;

      randomX = THREE.MathUtils.randFloat(minX, maxX);
      randomZ = THREE.MathUtils.randFloat(minZ, maxZ);

      // Ignora a geração de árvores dentro do quadrado central
      if ((randomX > emptyMinX && randomX < emptyMaxX) && (randomZ > emptyMinZ && randomZ < emptyMaxZ)) {
        tooClose = true;
        continue;
      }

      // Verificar se a nova posição está muito próxima de qualquer árvore existente
      for (let pos of treePositions) {
        const dx = pos.x - randomX ;
        const dz = pos.z - randomZ ;
        if (dx * dx + dz * dz < minTreeDistance * minTreeDistance) {  // Se a distância for menor que a distância mínima, está muito perto
          tooClose = true;
          break;
        }
      }
    } while (tooClose);

    // Adicionar a nova posição à lista de posições de árvores
    treePositions.push({ x: randomX, z: randomZ });

    trunk.scale.set(5, (Math.random() + 1.5) * 13.0, 5);
    trunk.position.set(
      randomX,
      trunk.scale.y / 2.0,
      randomZ
    );

    // Adicione várias camadas de folhas para dar à árvore uma aparência mais plena
    for (let j = 0; j < 3; j++) {
      const leavesLayer = new THREE.Mesh(leavesGeo, leavesMat);

      leavesLayer.scale.set(10, trunk.scale.y / (j + 1), 10);
      leavesLayer.position.set(
        trunk.position.x,
        trunk.scale.y + j * 10,
        trunk.position.z
      );

      this._scene.add(leavesLayer);
    }

    this._scene.add(trunk);
  }

  const wallScale = 5;
  const wallHeight = 10;

  function addTower(scene, x, y, z) {
    const towerRadius = wallScale *4;
    const towerHeight = wallHeight * 10;
    const towerSegments = 8;

    const towerGeometry = new THREE.CylinderGeometry(towerRadius, towerRadius, towerHeight, towerSegments);
    const tower = new THREE.Mesh(towerGeometry, wallMat);
    tower.position.set(x, y + towerHeight/3.3 , z);

    scene.add(tower);

    const roofGeometry = new THREE.ConeGeometry(towerRadius*1.5, towerHeight / 2, towerSegments);
    const roof = new THREE.Mesh(roofGeometry, roofMat);
    roof.position.set(x, y + towerHeight+0.5, z); 

    scene.add(roof);
  }
 // Criação das muralhas laterais
const wallSide1 = new THREE.Mesh(wallGeo, wallMat);
wallSide1.scale.set(wallScale, wallHeight, (maxZ - minZ) + wallScale );
wallSide1.position.set(minX - wallScale, wallHeight, (maxZ + minZ));
this._scene.add(wallSide1);

const wallSide2 = new THREE.Mesh(wallGeo, wallMat);
wallSide2.scale.set(wallScale, wallHeight, (maxZ - minZ) + wallScale );
wallSide2.position.set(maxX + wallScale, wallHeight, (maxZ + minZ));
this._scene.add(wallSide2);

// Criação das muralhas verticais
const wallVertical1 = new THREE.Mesh(wallGeo, wallMat);
wallVertical1.scale.set((maxX - minX) + wallScale , wallHeight, wallScale);
wallVertical1.position.set((maxX + minX), wallHeight, minZ - wallScale);
this._scene.add(wallVertical1);

const wallVertical2 = new THREE.Mesh(wallGeo, wallMat);
wallVertical2.scale.set((maxX - minX) + wallScale , wallHeight, wallScale);
wallVertical2.position.set((maxX + minX), wallHeight, maxZ + wallScale);
this._scene.add(wallVertical2);




  // Criação dos cantos arredondados
  addTower(this._scene, minX - wallScale * 2, wallHeight, minZ - wallScale * 2);
  addTower(this._scene, minX - wallScale * 2, wallHeight, maxZ + wallScale * 2);
  addTower(this._scene, maxX + wallScale * 2, wallHeight, minZ - wallScale * 2);
  addTower(this._scene, maxX + wallScale * 2, wallHeight, maxZ + wallScale * 2);
}
onButtonClick11()
  {
    this.carBodyTexture = new THREE.TextureLoader().load("Images/body.jpg");
    this.carBodyMaterials = new THREE.MeshPhongMaterial({map: this.carBodyTexture}); 


    this.trapTexture = new THREE.TextureLoader().load("Images/body.jpg");
    this.trapTexture.wrapS = THREE.RepeatWrapping;
    this.trapTexture.wrapT = THREE.RepeatWrapping;
    this.trapTexture.offset.set( 0, 1 );
    this.trapTexture.repeat.set( 1, 0 );
    this.trapMesh.material.map = this.trapTexture;


    this.carBodyTexture = new THREE.TextureLoader().load("Images/body.jpg");
    this.carBodyTexture1 = new THREE.TextureLoader().load("Images/body1.png");


    this.carBody.material.map = this.carBodyTexture1;

    this.car.copy(this.car2);
    this.car.scale.set(0.1,0.1,0.1);

  }
onButtonClick12()
  {
    this.trapTexture = new THREE.TextureLoader().load("Images/body2.jpg");
    this.trapTexture.wrapS = THREE.RepeatWrapping;
    this.trapTexture.wrapT = THREE.RepeatWrapping;
    this.trapTexture.offset.set( 0, 1 );
    this.trapTexture.repeat.set( 1, 0 );

    this.trapMesh.material.map = this.trapTexture;

    this.carBodyTexture = new THREE.TextureLoader().load("Images/body2.jpg");
    this.carBodyTexture1 = new THREE.TextureLoader().load("Images/body22.png");


    this.carBody.material.map = this.carBodyTexture1;
    this.car.copy(this.car2);
    this.car.scale.set(0.1,0.1,0.1);

  }
  _car(){
    this.carBodyGeometry = new THREE.BoxGeometry(9, 1.9, 3.8);
    this.carBodyTexture = new THREE.TextureLoader().load("Images/body.jpg");
    this.carBodyTexture1 = new THREE.TextureLoader().load("Images/body1.png");
      //  const carBodyTexture = new THREE.TextureLoader().load("Images/body2.jpg");
       // const carBodyTexture1 = new THREE.TextureLoader().load("Images/body22.png");
       this.carBodyMaterials = [new THREE.MeshPhongMaterial({map: this.carBodyTexture1}), 
          new THREE.MeshPhongMaterial({map: this.carBodyTexture}),
          new THREE.MeshPhongMaterial({map: this.carBodyTexture}),
          new THREE.MeshPhongMaterial({map: this.carBodyTexture}),
          new THREE.MeshPhongMaterial({map: this.carBodyTexture}),
          new THREE.MeshPhongMaterial({map: this.carBodyTexture})
         // new THREE.MeshPhongMaterial({map: carBodyTexture1}), //Carro2
         // new THREE.MeshPhongMaterial({map: carBodyTexture1})
        ];
     /*   let uvAttribute = carBodyGeometry.getAttribute('uv');
    
    
    // Carro 2 ------
    //lado esquerdo
    uvAttribute.setXY(16,0,.7);
    uvAttribute.setXY(17,1,1);
    uvAttribute.setXY(18,0,0);
    uvAttribute.setXY(19,1,.3);
    //lado direito
    uvAttribute.setXY(20,0,1);
    uvAttribute.setXY(21,1,.7);
    uvAttribute.setXY(22,0,0.3);
    uvAttribute.setXY(23,1,0);
    carBodyGeometry.uvsNeedUpdate = true;
    // -------
    */
    this.carBody = new THREE.Mesh(this.carBodyGeometry, this.carBodyMaterials);
    this.carBody.position.set(0,-0.5,0);
    this.carBody.castShadow = true;
        console.log(this.carBodyGeometry.index);
        this._scene.add(this.carBody);
    
        
    // Definindo as dimensões da base do trapézio
    this.baseShape = new THREE.Shape();
    this.baseShape.moveTo(-2, -1); // ponto baixo esquerdo
    this.baseShape.lineTo(-0.5, 0.5); // em cima à esquerda
    this.baseShape.lineTo(1, 0.5); // em cima à direita
    this.baseShape.lineTo(2, -1); // em baixo à esquerda
    this.baseShape.lineTo(-2, -1); // de volta ao ponto inicial
    
    // Definindo as dimensões da forma a ser extrudada
    this.extrudeSettings = {
    depth: 3.4,
    };
    
    // Criando a geometria do trapézio usando ExtrudeGeometry
    this.trapGeometry = new THREE.ExtrudeGeometry(this.baseShape, this.extrudeSettings);
    //const trapTexture = new THREE.TextureLoader().load("Images/body2.jpg"); //Carro2
    this.trapTexture = new THREE.TextureLoader().load("Images/body.jpg"); 
    
    
    this.trapTexture.wrapS = THREE.RepeatWrapping;
    this.trapTexture.wrapT = THREE.RepeatWrapping;
    this.trapTexture.offset.set( 0, 1 );
    this.trapTexture.repeat.set( 1, 0 );
    this.trapMaterial = new THREE.MeshStandardMaterial({ map: this.trapTexture, metalness: 0 });
    this.trapMesh = new THREE.Mesh(this.trapGeometry, this.trapMaterial);
    
    this.trapMesh.position.set(0.5, 1.45, -1.7);
    this.trapMesh.castShadow = true;
    this._scene.add(this.trapMesh);
    
    
    // Cria a roda dianteira esquerda
    this.wheelGeometry = new THREE.RingGeometry( 0, 0.9, 256 );
    this.wheelTexture = new THREE.TextureLoader().load("Images/jante.png");
    this.wheelMaterial = new THREE.MeshPhongMaterial( { map: this.wheelTexture, side: THREE.DoubleSide, color: "white"} );
    this.wheel1 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
    this.wheel11 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
    this.wheel1.position.set( -2.1, -1.3, 2.1 );
    this.wheel11.position.set( -2.1, -1.3, 1.7)
    this._scene.add( this.wheel1 );
    this._scene.add( this.wheel11 );
    
    // Cria a roda dianteira direita
    this.wheel2 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
    this.wheel22 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
    this.wheel2.position.set( 2.1, -1.3, 2.1 );
    this.wheel22.position.set( 2.1, -1.3, 1.7 );
    this._scene.add( this.wheel2 );
    this._scene.add( this.wheel22 );
    
    // Cria a roda traseira esquerda
    this.wheel3 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
    this.wheel33 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
    this.wheel3.position.set( -2.1, -1.3, -2.1 );
    this.wheel33.position.set( -2.1, -1.3, -1.7 );
    this._scene.add( this.wheel3 );
    this._scene.add( this.wheel33 );
    
    // Cria a roda traseira direita
    this.wheel4 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
    this.wheel44 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
    this.wheel4.position.set( 2.1, -1.3, -2.1 );
    this.wheel44.position.set( 2.1, -1.3, -1.7 );
    this._scene.add( this.wheel4 );
    this._scene.add( this.wheel44 );
    
    //pneus
    this.tireGeometry = new THREE.CylinderGeometry(0.9, 0.9, 0.5, 32, 1, true);
    this.tireTexture = new THREE.TextureLoader().load("Images/pneu.jpg");
    this.tireMaterial = new THREE.MeshStandardMaterial({map: this.tireTexture});
    this.tire1 = new THREE.Mesh(this.tireGeometry, this.tireMaterial);
    this.tire2 = new THREE.Mesh(this.tireGeometry, this.tireMaterial);
    this.tire3 = new THREE.Mesh(this.tireGeometry, this.tireMaterial);
    this.tire4 = new THREE.Mesh(this.tireGeometry, this.tireMaterial);
    
    this.tire1.position.set( -2.1, -1.3, 1.9 );
    this.tire1.rotation.x = -0.5 * Math.PI;
    this._scene.add(this.tire1);
    
    this.tire2.position.set( 2.1, -1.3, 1.9 );
    this.tire2.rotation.x = 0.5 * Math.PI;
    this._scene.add(this.tire2);
    
    this.tire3.position.set(-2.1, -1.3, -1.9  );
    this.tire3.rotation.x = -0.5 * Math.PI;
    this._scene.add(this.tire3);
    
    this.tire4.position.set( 2.1, -1.3, -1.9 );
    this.tire4.rotation.x = 0.5 * Math.PI;
    this._scene.add(this.tire4);
    
    // farois
    this.faroisGeometry = new THREE.SphereGeometry(0.25, 16, 8);
    this.faroisMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, transparent: true, opacity: 0.55, emissive: 0xFFFFFF, emissiveIntensity: 0.5});
    this.faroisTraseirosMaterial = new THREE.MeshStandardMaterial({color: 0xFF0000, transparent: true, opacity: 0.55, emissive: 0xFF0000, emissiveIntensity: 0.5});
    this.farol1 = new THREE.Mesh( this.faroisGeometry, this.faroisMaterial );
    this.farol2 = new THREE.Mesh( this.faroisGeometry, this.faroisMaterial );
    this.farolTraseiroDireitos = [new THREE.Mesh( this.faroisGeometry, this.faroisTraseirosMaterial ), new THREE.Mesh( this.faroisGeometry, this.faroisTraseirosMaterial )];
    this.farolTraseiroEsquerdos = [new THREE.Mesh( this.faroisGeometry, this.faroisTraseirosMaterial ), new THREE.Mesh( this.faroisGeometry, this.faroisTraseirosMaterial )];
    this.farolTraseiroDireitos[0].position.set(4.4,-0.20,-1.0);
    this.farolTraseiroDireitos[1].position.set(4.45,-0.12,-1.4);
    this.farolTraseiroDireitos[0].scale.set(0.75,0.75,0.75);
    this.farolTraseiroEsquerdos[0].position.set(4.4,-0.20,1.0);
    this.farolTraseiroEsquerdos[1].position.set(4.45,-0.12,1.4);
    this.farolTraseiroEsquerdos[0].scale.set(0.75,0.75,0.75);
    this.farol1.position.set(-4.45,-0.15,1);
    this.farol1.scale.set(1,1,1.25);
    this.farol2.position.set(-4.45,-0.15,-1);
    this.farol2.scale.set(1,1,1.25);
    this._scene.add(this.farol1, this.farol2, this.farolTraseiroDireitos[0], this.farolTraseiroDireitos[1], this.farolTraseiroEsquerdos[0], this.farolTraseiroEsquerdos[1]);
    
    
    //spoiler
    this.spoilerGeometry = new THREE.BoxGeometry(1,1,1);
    this.spoilerMaterial = new THREE.MeshPhongMaterial({color: 0x000000});
    this.cimaSpoiler = new THREE.Mesh(this.spoilerGeometry, this.spoilerMaterial);
    this.esquerdaSpoiler = new THREE.Mesh(this.spoilerGeometry, this.spoilerMaterial);
    this.direitaSpoiler = new THREE.Mesh(this.spoilerGeometry, this.spoilerMaterial);
    this.esquerdaSpoiler.position.set(4,0.6,1);
    this.esquerdaSpoiler.rotation.x = Math.PI / 2;
    this.esquerdaSpoiler.scale.set(0.3,0.1,0.875);
    this.direitaSpoiler.position.set(4,0.6,-1);
    this.direitaSpoiler.rotation.x = Math.PI / 2;
    this.direitaSpoiler.scale.set(0.3,0.1,0.875);
    this.cimaSpoiler.position.set(4,1,0)
    this.cimaSpoiler.scale.set(0.5,0.1,4);
    this._scene.add(this.cimaSpoiler);
    this._scene.add(this.esquerdaSpoiler);
    this._scene.add(this.direitaSpoiler);
    
    //janelas
    this.janelaGeometry = new THREE.BoxGeometry(0.05,1.6,3);
    this.janelaMaterial = new THREE.MeshPhongMaterial({transparent: true, opacity: 0.9, color: 0x000000});
    this.janelaMeshFrente = new THREE.Mesh(this.janelaGeometry, this.janelaMaterial);
    this.janelaMeshTraseira = new THREE.Mesh(this.janelaGeometry, this.janelaMaterial);
    this.janelaMeshTraseira.position.set(2.1,1.2,0);
    this.janelaMeshTraseira.rotation.z = Math.PI/5.3;
    this.janelaMeshFrente.position.set(-0.90,1.2,0);
    this.janelaMeshFrente.rotation.z = -Math.PI/4.1;
    
    this.janelasLateraisShape = new THREE.Shape();
    this.janelasLateraisShape.moveTo()
    
    this.janelasLateraisShape.moveTo(-2, -1); // ponto baixo esquerdo
    this.janelasLateraisShape.lineTo(-0.5, 0.5); // em cima à esquerda
    this.janelasLateraisShape.lineTo(1, 0.5); // em cima à direita
    this.janelasLateraisShape.lineTo(2, -1); // em baixo à esquerda
    this.janelasLateraisShape.lineTo(-2, -1); // de volta ao ponto inicial
    
    this.extrudeSettings1 =  { depth: 4.4, } ;
    
    this.janelasLateraisGeometry = new THREE.ExtrudeGeometry(this.janelasLateraisShape, this.extrudeSettings1);
    this.janelasLateraisMaterial = new THREE.MeshPhongMaterial({color: 0x000000});
    this.janelasLateraisMesh  = new THREE.Mesh(this.janelasLateraisGeometry, this.janelasLateraisMaterial);
    this.janelasLateraisMesh.position.set(.5,1.35,-1.75);
    this.janelasLateraisMesh.scale.set(0.8,.8,.8);
    
    this._scene.add(this.janelaMeshTraseira,this.janelaMeshFrente, this.janelasLateraisMesh);
    
    this.camera1pessoa.rotation.y = Math.PI / 2;
    this.camera1pessoa.position.y += 2;
    //this.camera3pessoa.rotation.y = Math.PI / 2;
    this.camera3pessoa.rotation.x = -Math.PI/2 ;
    //this.camera3pessoa.rotation.z = -Math.PI ;
    this.camera3pessoa.rotation.y = Math.PI / 2;
    this.camera3pessoa.position.y += 10;
    this.camera3pessoa.position.x += 20;
    
    
    //this._camera.position.set(position);
    this.car = new THREE.Object3D();
    
    this.car.add(this.carBody, this.trapMesh);
    this.car.add(this.wheel1, this.wheel11, this.tire1);
    this.car.add(this.wheel2, this.wheel22, this.tire2);
    this.car.add(this.wheel3, this.wheel33, this.tire3);
    this.car.add(this.wheel4, this.wheel44, this.tire4);
    this.car.add(this.farol1, this.farol2, this.farolTraseiroDireitos[0], this.farolTraseiroDireitos[1], this.farolTraseiroEsquerdos[0], this.farolTraseiroEsquerdos[1]);
    this.car.add(this.cimaSpoiler, this.esquerdaSpoiler, this.direitaSpoiler);
    this.car.add(this.janelaMeshFrente,this.janelaMeshTraseira, this.janelasLateraisMesh);
    this.car.add(this.camera1pessoa);
    this.car.add(this.camera3pessoa);
    
    //this.car.castShadow = true;
    //this.car.receiveShadow = true;
    this.car.scale.set(0.1,0.1,0.1);
    
    this.carBoundingBox = new THREE.Box3().setFromObject(this.car);
    
    //const box3Helper = new THREE.Box3Helper(this.carBoundingBox, 0x00ff00);
    //box3Helper.material.linewidth = 2;
    //this._scene.add(box3Helper);
    
    this._scene.add(this.car);
    
    }

_car2(){
  this.carBodyGeometry = new THREE.BoxGeometry(9, 1.9, 3.8);
  this.carBodyTexture = new THREE.TextureLoader().load("Images/body.jpg");
  this.carBodyMaterials = new THREE.MeshPhongMaterial({map: this.carBodyTexture}); // Traseira do carro
       // new THREE.MeshPhongMaterial({map: carBodyTexture}), // Frente do carro
       // new THREE.MeshPhongMaterial({map: carBodyTexture}), // Lados do carro
       // new THREE.MeshPhongMaterial({map: carBodyTexture}), // Teto do carro
       // new THREE.MeshPhongMaterial({map: carBodyTexture}), // Chão do carro
      //  new THREE.MeshPhongMaterial({map: carBodyTexture})  // Outras faces do carro
      this.carBody = new THREE.Mesh(this.carBodyGeometry, this.carBodyMaterials);
      this.carBody.position.set(0,-0.5,0);
      this.carBody.castShadow = true;
      this.scene2.add(this.carBody);
  
      
  // Definindo as dimensões da base do trapézio
  this.baseShape = new THREE.Shape();
  this.baseShape.moveTo(-2, -1); // ponto baixo esquerdo
  this.baseShape.lineTo(-0.5, 0.5); // em cima à esquerda
  this.baseShape.lineTo(1, 0.5); // em cima à direita
  this.baseShape.lineTo(2, -1); // em baixo à esquerda
  this.baseShape.lineTo(-2, -1); // de volta ao ponto inicial
  
  // Definindo as dimensões da forma a ser extrudada
  this.extrudeSettings = {
  depth: 3.4,
  
  };
  
  // Criando a geometria do trapézio usando ExtrudeGeometry
  this.trapGeometry = new THREE.ExtrudeGeometry(this.baseShape, this.extrudeSettings);
  this.trapTexture = new THREE.TextureLoader().load("Images/body.jpg");
  
  this.trapTexture.wrapS = THREE.RepeatWrapping;
  this.trapTexture.wrapT = THREE.RepeatWrapping;
  this.trapTexture.offset.set( 0, 1 );
  this.trapTexture.repeat.set( 1, 0 );
  this.trapMaterial = new THREE.MeshStandardMaterial({ map: this.trapTexture, metalness: 0 });
  
  
  // Criando a malha do objeto resultante da geometria e material
  this.trapMesh = new THREE.Mesh(this.trapGeometry, this.trapMaterial);
  
  // Aplicando uma escala para reduzir o tamanho do objeto
  //trapMesh.scale.set(0.5, 0.5, 0.5);
  this.trapMesh.position.set(0.5, 1.45, -1.7);
  this.trapMesh.castShadow = true;
  // Adicionando o objeto à cena
  this.scene2.add(this.trapMesh);
  
  
  // Cria a roda dianteira esquerda
  this.wheelGeometry = new THREE.RingGeometry( 0, 0.9, 256 );
  this.wheelTexture = new THREE.TextureLoader().load("Images/jante.png");
  this.wheelMaterial = new THREE.MeshPhongMaterial( { map: this.wheelTexture, side: THREE.DoubleSide, wireframe: false} );
  this.wheel11 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
  this.wheel111 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
  this.wheel11.position.set( -2.1, -1.3, 2.1 );
  this.wheel111.position.set( -2.1, -1.3, 1.7)
  this.scene2.add( this.wheel11 );
  this.scene2.add( this.wheel111 );
  
  // Cria a roda dianteira direita
  this.wheel22 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
  this.wheel222 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
  this.wheel22.position.set( 2.1, -1.3, 2.1 );
  this.wheel222.position.set( 2.1, -1.3, 1.7 );
  this.scene2.add( this.wheel22 );
  this.scene2.add( this.wheel222 );
  
  // Cria a roda traseira esquerda
  this.wheel33 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
  this.wheel333 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
  this.wheel33.position.set( -2.1, -1.3, -2.1 );
  this.wheel333.position.set( -2.1, -1.3, -1.7 );
  this.scene2.add( this.wheel33 );
  this.scene2.add( this.wheel333 );
  
  // Cria a roda traseira direita
  this.wheel44 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
  this.wheel444 = new THREE.Mesh( this.wheelGeometry, this.wheelMaterial );
  this.wheel44.position.set( 2.1, -1.3, -2.1 );
  this.wheel444.position.set( 2.1, -1.3, -1.7 );
  this.scene2.add( this.wheel44 );
  this.scene2.add( this.wheel444 );
  
  // Cria um objeto THREE.Mesh para simular o pneu
  this.tireGeometry = new THREE.CylinderGeometry(0.9, 0.9, 0.5, 32, 1, true);
  this.tireTexture = new THREE.TextureLoader().load("Images/pneu.jpg");
  this.tireMaterial = new THREE.MeshStandardMaterial({map: this.tireTexture});
  this.tire11 = new THREE.Mesh(this.tireGeometry, this.tireMaterial);
  this.tire22 = new THREE.Mesh(this.tireGeometry, this.tireMaterial);
  this.tire33 = new THREE.Mesh(this.tireGeometry, this.tireMaterial);
  this.tire44 = new THREE.Mesh(this.tireGeometry, this.tireMaterial);
  
  // Posiciona o pneu abaixo da roda e a faz girar juntamente com ela
  this.tire11.position.set( -2.1, -1.3, 1.9 );
  this.tire11.rotation.x = -0.5 * Math.PI;
  this.scene2.add(this.tire11);
  
  this.tire22.position.set( 2.1, -1.3, 1.9 );
  this.tire22.rotation.x = 0.5 * Math.PI;
  this.scene2.add(this.tire22);
  
  this.tire33.position.set(-2.1, -1.3, -1.9  );
  this.tire33.rotation.x = -0.5 * Math.PI;
  this.scene2.add(this.tire33);
  
  this.tire44.position.set( 2.1, -1.3, -1.9 );
  this.tire44.rotation.x = 0.5 * Math.PI;
  this.scene2.add(this.tire44);
  
  // farois
  this.faroisGeometry = new THREE.SphereGeometry(0.25, 16, 8);
  this.faroisMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, transparent: true, opacity: 0.55, emissive: 0xFFFFFF, emissiveIntensity: 0.5});
  this.faroisTraseirosMaterial = new THREE.MeshStandardMaterial({color: 0xFF0000, transparent: true, opacity: 0.55, emissive: 0xFF0000, emissiveIntensity: 0.5});
  this.farol11 = new THREE.Mesh( this.faroisGeometry, this.faroisMaterial );
  this.farol22 = new THREE.Mesh( this.faroisGeometry, this.faroisMaterial );
  this.farolTraseiroDireitos2 = [new THREE.Mesh( this.faroisGeometry, this.faroisTraseirosMaterial ), new THREE.Mesh( this.faroisGeometry, this.faroisTraseirosMaterial )];
  this.farolTraseiroEsquerdos2 = [new THREE.Mesh( this.faroisGeometry, this.faroisTraseirosMaterial ), new THREE.Mesh( this.faroisGeometry, this.faroisTraseirosMaterial )];
  this.farolTraseiroDireitos2[0].position.set(4.4,-0.20,-1.0);
  this.farolTraseiroDireitos2[1].position.set(4.45,-0.12,-1.4);
  this.farolTraseiroDireitos2[0].scale.set(0.75,0.75,0.75);
  this.farolTraseiroEsquerdos2[0].position.set(4.4,-0.20,1.0);
  this.farolTraseiroEsquerdos2[1].position.set(4.45,-0.12,1.4);
  this.farolTraseiroEsquerdos2[0].scale.set(0.75,0.75,0.75);
  this.farol11.position.set(-4.45,-0.15,1);
  this.farol11.scale.set(1,1,1.25);
  this.farol22.position.set(-4.45,-0.15,-1);
  this.farol22.scale.set(1,1,1.25);
  this.scene2.add(this.farol11, this.farol22, this.farolTraseiroDireitos2[0], this.farolTraseiroDireitos2[1], this.farolTraseiroEsquerdos2[0], this.farolTraseiroEsquerdos2[1]);
  
  
  //spoiler
  this.spoilerGeometry = new THREE.BoxGeometry(1,1,1);
  this.spoilerMaterial = new THREE.MeshPhongMaterial({color: 0x000000});
  this.cimaSpoiler = new THREE.Mesh(this.spoilerGeometry, this.spoilerMaterial);
  this.esquerdaSpoiler = new THREE.Mesh(this.spoilerGeometry, this.spoilerMaterial);
  this.direitaSpoiler = new THREE.Mesh(this.spoilerGeometry, this.spoilerMaterial);
  this.esquerdaSpoiler.position.set(4,0.6,1);
  this.esquerdaSpoiler.rotation.x = Math.PI / 2;
  this.esquerdaSpoiler.scale.set(0.3,0.1,0.875);
  this.direitaSpoiler.position.set(4,0.6,-1);
  this.direitaSpoiler.rotation.x = Math.PI / 2;
  this.direitaSpoiler.scale.set(0.3,0.1,0.875);
  this.cimaSpoiler.position.set(4,1,0)
  this.cimaSpoiler.scale.set(0.5,0.1,4);
  this.scene2.add(this.cimaSpoiler);
  this.scene2.add(this.esquerdaSpoiler);
  this.scene2.add(this.direitaSpoiler);
  
  //janelas
  this.janelaGeometry = new THREE.BoxGeometry(0.05,1.6,3);
  this.janelaMaterial = new THREE.MeshPhongMaterial({transparent: true, opacity: 0.9, color: 0x000000});
  this.janelaMeshFrente = new THREE.Mesh(this.janelaGeometry, this.janelaMaterial);
  this.janelaMeshTraseira = new THREE.Mesh(this.janelaGeometry, this.janelaMaterial);
  this.janelaMeshTraseira.position.set(2.1,1.2,0);
  this.janelaMeshTraseira.rotation.z = Math.PI/5.3;
  this.janelaMeshFrente.position.set(-0.90,1.2,0);
  this.janelaMeshFrente.rotation.z = -Math.PI/4.1;
  this.scene2.add(this.janelaMeshTraseira,this.janelaMeshFrente);
  
  
  //this._camera.position.set(position);
  this.car2 = new THREE.Object3D();
  
  this.car2.add(this.carBody, this.trapMesh);
  this.car2.add(this.wheel11, this.wheel111, this.tire11);
  this.car2.add(this.wheel22, this.wheel222, this.tire22);
  this.car2.add(this.wheel33, this.wheel333, this.tire33);
  this.car2.add(this.wheel44, this.wheel444, this.tire44);
  this.car2.add(this.farol11, this.farol22, this.farolTraseiroDireitos2[0], this.farolTraseiroDireitos2[1], this.farolTraseiroEsquerdos2[0], this.farolTraseiroEsquerdos2[1]);
  this.car2.add(this.cimaSpoiler, this.esquerdaSpoiler, this.direitaSpoiler);
  this.car2.add(this.janelaMeshFrente,this.janelaMeshTraseira);

  

  
  this.car2.scale.set(1,1,1);
  
  this.scene2.add(this.car2);
  this.car2.castShadow = true;
  this.car2.receiveShadow = true;
  this.car2.position.set(20, 0, 72);
  }

_lab()
    {
    const labirinto =  [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 10, 0, 1],  // 10 - final
      [1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
      [1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1],
      [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

  ];
    const blockSize = 5;
    const textureLoader = new THREE.TextureLoader();
    const paredeTexture1 = textureLoader.load('./Parede/Wall_Stone_017_AmbientOcclusion.jpg');
    const paredeTexture2 = textureLoader.load('./Parede/Wall_Stone_017_BaseColor.jpg');
    const paredeTexture3 = textureLoader.load('./Parede/Wall_Stone_017_Height.png');
    const paredeTexture4 = textureLoader.load('./Parede/Wall_Stone_017_Normal.jpg');
    const paredeTexture5 = textureLoader.load('./Parede/Wall_Stone_017_Roughness.jpg');
    const paredeMaterial = new THREE.MeshStandardMaterial({ color: 'grey', map: paredeTexture2, normalMap: paredeTexture4, roughnessMap: paredeTexture5, aoMap: paredeTexture1, displacementMap: paredeTexture3, displacementScale:0});

    this.createMaze(labirinto, blockSize, paredeMaterial, 5)
  }
  createMaze(labirinto, blockSize, wallMaterial, wallHeight) 
  {
    const mazeWidth = labirinto[0].length * blockSize;
    const mazeDepth = labirinto.length * blockSize;
    const mazeOffsetX = -(mazeWidth / 2) + blockSize / 2; // Deslocamento horizontal para centralizar o labirinto
    const mazeOffsetZ = -(mazeDepth / 2) + blockSize / 2; // Deslocamento vertical para centralizar o labirinto
    

    for (let z = 0; z < labirinto.length; z++) {
      for (let x = 0; x < labirinto[z].length; x++) {
        if (labirinto[z][x] === 1) {
          const wallGeometry = new THREE.BoxGeometry(blockSize, wallHeight, blockSize, 20, 20);
          const wall = new THREE.Mesh(wallGeometry, wallMaterial);
          wall.castShadow = true;
          wall.receiveShadow=true;

          wall.position.set(
            x * blockSize + mazeOffsetX,
            wallHeight /300,
            z * blockSize + mazeOffsetZ
          );
          this._scene.add(wall);
          this.walls.push(wall);
        }
      }
    }
    

    //let VecMin = new THREE.Vector3(blockSize * (1 - reductionFactor) / 2, blockSize * (1 - reductionFactor) / 2, blockSize * (1 - reductionFactor) / 2);
    //let VecMax = new THREE.Vector3(-blockSize * (1 - reductionFactor) / 2, -blockSize * (1 - reductionFactor) / 2, -blockSize * (1 - reductionFactor) / 2);
    //this.wallBoundingBoxes = this.walls.map(wall => new THREE.Box3(VecMin,VecMax).setFromObject(wall));
    this.wallBoundingBoxes = this.walls.map(wall => new THREE.Box3().setFromObject(wall));

  }  
  _positionCamera()
   {

    // Posiciona da camera
    this.cameradinamica.position.set(0, 150, 0);

    // Direçao da camera
    this.cameradinamica.lookAt(0,0,0);

  }
  _camera3pessoa()
{
  const aspect = 1920 / 1080;
  const far = 2000.0;

  this.camera3pessoa = new THREE.PerspectiveCamera(80, aspect, 1, far);
 // this._camera3pessoa.position.set(position.x + 5, position.y + 2, position.z);

}


  _camera1pessoa()
  {
    const aspect = 1920 / 1080;
    const far = 1000.0;
    this.insetWidth = window.innerWidth / 4;
    this.insetHeight = window.innerHeight / 4;
    this.camera1pessoa = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.5,2000);
    this.camera1pessoaAtras = new THREE.PerspectiveCamera(75, 16/9, 0.5, 2000);
    this.camera1pessoaAtras.position.z += 2;
    this.camera1pessoaAtras.rotation.y += Math.PI;
    this.camera1pessoa.add(this.camera1pessoaAtras);
    //this._camera1pessoa.position.set(position.x, position.y, position.z);
  
  }  


_cameradinamica()
{
  
  const fov = 60;
  const aspect = 1920 / 1080;
  const near = 1.0;
  const far = 2000.0;
  this.cameradinamica = new THREE.PerspectiveCamera(fov, aspect, near, far);

  this.cameradinamica.position.set(75, 20, 0);

  const controls = new OrbitControls(
  this.cameradinamica, this._threejs.domElement);
  controls.target.set(0, 20, 0);
  controls.update();
  
}

_cameraOrtografica() {
  //Dimensões da câmera ortográfica
  const aspectRatio = window.innerWidth / window.innerHeight;
  const frustumSize = 10;
  const near = 1;
  const far = 2000;
  const zoomSpeed = 1.2;

  this.cameraOrtografica = new THREE.OrthographicCamera(
    frustumSize * aspectRatio / -2,
    frustumSize * aspectRatio / 2,
    frustumSize / 2,
    frustumSize / -2,
    near,
    far
  );

  this.cameraOrtografica.position.set(0, 100, -50);//posiçao
  this.cameraOrtografica.lookAt(0, -1, 0);//direçao

  this._scene.add(this.cameraOrtografica);

  //Controlos
  const controls = new OrbitControls(this.cameraOrtografica, this._threejs.domElement);
  controls.zoomSpeed = zoomSpeed;
}
// Função para alternar as câmeras
_switchCamera() {
  if (this.currentCamera === this.camera1pessoa) {
    this.currentCamera = this.camera3pessoa;
    this._car.visible = true;
  } else if (this.currentCamera === this.camera3pessoa) {
    this.currentCamera = this.cameradinamica;
    this._car.visible = true;
  } else if (this.currentCamera === this.cameradinamica) {
    this.currentCamera = this.cameraOrtografica;
    this._car.visible = true;
  } else {
    this.currentCamera = this.camera1pessoa;
    this._car.visible = false;
  }
}
_OnWindowResize()
   {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }
  
  _MoveCar() {
  
    document.addEventListener('keydown', (event) => {
      if (!podeMover) {
        return;
      }
      
      switch (event.code) {
        case 'ArrowUp':
          desiredMoveForward = true;
          break;
        case 'ArrowDown':
          desiredMoveBackward = true;
          break;
        case 'ArrowLeft':
          desiredTurnLeft = true;
          break;
        case 'ArrowRight':
          desiredTurnRight = true;
          break;
      }
    });
  
    document.addEventListener('keyup', (event) => {
      if (!podeMover) {
        return;
      }
      
      switch (event.code) {
        case 'ArrowUp':
          desiredMoveForward = false;
          break;
        case 'ArrowDown':
          desiredMoveBackward = false;
          break;
        case 'ArrowLeft':
          desiredTurnLeft = false;
          break;
        case 'ArrowRight':
          desiredTurnRight = false;
          break;
      }
    });
  }
  
  
_RAF() 
  {
    requestAnimationFrame(() => {
      // girando o carro
      if (podeMover) {
        if (desiredTurnLeft) {
          rotation.y += 0.01;
        }
        if (desiredTurnRight) {
          rotation.y -= 0.01;
        }
        // movendo o carro na direção em que ele está virado
        if (desiredMoveForward) {
          speed += acceleration;
        } 
        if (desiredMoveBackward) {
          speed -= deceleration;
        } 
      }
this.wheel1.rotation.z += speed;
this.wheel2.rotation.z += speed;
this.wheel3.rotation.z += speed;
this.wheel4.rotation.z += speed;

this.wheel11.rotation.z += speed;
this.wheel22.rotation.z += speed;
this.wheel33.rotation.z += speed;
this.wheel44.rotation.z += speed;

this.tire1.rotation.y -= speed;
this.tire2.rotation.y += speed;
this.tire3.rotation.y -= speed;
this.tire4.rotation.y += speed;

  // atualizar a posição do carro com base na velocidade e rotação
  const direction = new THREE.Vector3(-1, 0, 0).applyEuler(rotation);
  position.add(direction.multiplyScalar(speed));

  // aplicar atrito
  speed *= friction;

  // limitar a velocidade máxima
  if (speed > maxSpeed) {
    speed = maxSpeed;
  } else if (speed < -maxSpeed) {
    speed = -maxSpeed;
  }

  if(speed > 0 && moveBackward){
    this.spotLightTraseiro1.distance = 20;
    this.spotLightTraseiro2.distance = 20;
    this.spotLightTraseiro1.intensity = 2;
    this.spotLightTraseiro2.intensity = 2;
  } else {
    this.spotLightTraseiro1.distance = 10;
    this.spotLightTraseiro2.distance = 10;
    this.spotLightTraseiro1.intensity = 1;
    this.spotLightTraseiro2.intensity = 1;
  }

  if(speed < 0 && moveBackward){
     this.spotLightTraseiroMarchaAtras1.visible = true;
     this.spotLightTraseiroMarchaAtras2.visible = true;
  }
  else{
     this.spotLightTraseiroMarchaAtras1.visible = false;
     this.spotLightTraseiroMarchaAtras2.visible = false;

  }

  // atualizar a posição e rotação do carro
  this.car.position.copy(position);
  this.car.rotation.copy(rotation);
  
  this.camera3pessoa.lookAt(position.x, position.y + 1, position.z);
      // Atualize a caixa delimitadora do carro para refletir a nova posição
   this.car.updateMatrix();
   this.carBoundingBox.setFromObject(this.car,true);
   
   if (this.worldCupBoundingBox) {
    this.worldCupBoundingBox.setFromObject(this.worldCupObject);
  }
    // Verifique se o carro está colidindo com alguma das pa
  

    if (this.carBoundingBox && this.worldCupBoundingBox) {
      const isColliding2 = this.carBoundingBox.intersectsBox(this.worldCupBoundingBox);
    
    
    if (isColliding2 && !this.tocouTrofeu ) {
      
      //speed=-speed;
      speed = 0;
      podeMover = false;

      pararCronometro();
      this._vitoria();    
      this.tocouTrofeu = true;
    
    }
    if (isColliding2)
    {
      speed=0;
      this.sound.stop();
      this.sound2.play();
     
    }
  }
    const isColliding = this.wallBoundingBoxes.some(wallBox => this.carBoundingBox.intersectsBox(wallBox));
   
    if (isColliding ) {
     speed=-speed;
     
    }
    if (this.currentCamera == this.camera1pessoa){
      //this.car.visible = false;
    this._threejs.setViewport(0,0,window.innerWidth, window.innerHeight);
    this._threejs.render(this.currentScene, this.currentCamera);
    this._threejs.clearDepth();
    this._threejs.setScissorTest(true);
    this._threejs.setScissor(this.insetWidth + 100,  this.insetHeight + 500, this.insetWidth + 300, this.insetHeight - 50);
    this._threejs.setViewport(this.insetWidth + 100, this.insetHeight + 500, this.insetWidth + 300, this.insetHeight - 50);
    this._threejs.render(this.currentScene, this.camera1pessoaAtras);
    this._threejs.setScissorTest(false);
    }else{ 

      this._threejs.setViewport(0,0,window.innerWidth, window.innerHeight);
      this._threejs.render(this.currentScene, this.currentCamera);
    }
 
      this._RAF();
    });
  }
}
/*// Criar um objeto Cannon.js World para a simulação
const world = new CANNON.World();
world.gravity.set(0, -9.8, 0); // Definir a gravidade (opcional)

// Função de atualização da física (chamada a cada quadro)
function updatePhysics() {
  world.step(1 / 60); // Passo de simulação (1/60 = 60fps)

  // Atualizar as posições e rotações dos objetos na cena com base na simulação física
  // Exemplo: plane.position.copy(planeBody.position);
  
  requestAnimationFrame(updatePhysics);
}
// Criar uma forma de caixa para o objeto plano
const planeShape = new CANNON.Box(new CANNON.Vec3(35, 0.1, 35));

// Criar um corpo rígido para o objeto plano
const planeBody = new CANNON.Body({ mass: 0 });
planeBody.addShape(planeShape);
planeBody.position.set(0, -5, 0); // Posição inicial da plataforma

// Adicionar o corpo rígido ao mundo da física
world.addBody(planeBody);
updatePhysics();*/

let _APP = null;

window.addEventListener('DOMContentLoaded', function() {
  _APP = new BasicWorldDemo();
});

