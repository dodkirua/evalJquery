import {Question} from "./Question.js";

let question = $("#question");
let answer = $("#answer");
let select;
let wrongAnswer = [];
let ind = 0;
let score = 0;
let kaamelott = [
    ["Qui joue Arthur Pendragon roi de Bretagne ?",
        "Lionel Astier",
        "Franck Pitiot",
        "Jean-Christophe Hembert",
        "Alexandre Astier",
        "4"
    ],
    ["Qui est la mère de Guenièvre ?",
         "Ygerne",
         "Mevanwi",
         "Dematra",
         "Seli",
         "4"
    ],
    ["Qui a inventé la botte secrète ?",
         "Perceval",
         "Gauvain",
         "Le maître d'arme",
         "Karadoc",
         "4"
    ],
    ["Combien y a t'il  de pierre dans le chateau d'après Perceval ?",
         "16130",
         "18458",
         "14750",
         "21583",
         "1"
    ],
    ["Quand Apparait pour la première fois Mewanwi (la femme de Karadoc) ?",
        "livre 1 ep 50",
        "livre 2 ep 40",
        "livre 1 ep 15",
        "livre 2 ep 10",
        "4"
    ],
    ["Qui Joue Berlewen la femme de Bohort ?",
        "Valerie Benguigui",
        "Virginie Efira",
        "Adrianna Karembeu",
        "Estelle Lefébure",
        "2"
    ],
    ["Qui sont les 2 paysans qui se chamaille tous le temps ?",
        "Ghethenoc et Grüdü",
        "Kadoc et Roparzh",
        "Kadoc et Grüdü",
        "Guethenoc et Roparz",
        "4"
    ],
    ["Qui joue l'interprète du roi Burgonde", 
        "Lorànt Deutsch",
        "Philippe Nahon",
        "Alain Chabat",
        "Tony Saba",
        "1"
    ],
    ["Combien de point faut il au cul de chouette pour gagner ?",
        " 254",
        "343",
        "42",
        "Chante Sloubi",
        "2"
    ],
    ["Quelle est le rêve de Perceval ?",
        "Aider Arthur pour le Graal",
        "Elever des chèvres dans les landes Irlandaise",
        "Voyager dans les étoiles",
        "Etre le roi de Bretagne",
        "3"
        ]
]
let manga = [
    ["Quelle a été le premier manga diffusé en France sous forme d'animé ?",
        "Albator",
        "Goldorak",
        "Astro boy",
        "Candy",
        "2"
    ],
    ["Brigitte Lecordier n'a pas doublé une de ses voix laquelle?",
        "Son goku",
        "Son Gohan",
        "son Goten",
        "Krilin",
        "4"
    ],
    ["Quelle est le vrai nom de Nikki Larson",
        "Ryu ",
        "Ryô Saeba",
        "Hideyuki Makimura",
        "Rio de Janeiro",
        "2"
    ],
    ["Comment s'appelle la famille de Kirua dans Hunter X Hunter",
        "Kurata",
        "Freecs",
        "Zoldik",
        "Paradinaito",
        "3"
    ],
    ["Quelle est l'intru dans ces types de fruit du démon ?",
        "Paramécia",
        "Zoan",
        "Logia",
        "Frontia",
        "4"
    ],
    ["Qui est le chevalier du scorpion dans Saint Seiya ?",
        "Dohko",
        "Shaka",
        "Shura",
        "Milo",
        "4"
    ],
    ["Dans Ken le survivant quelle est l'art martial de Ken",
        "Nanto Roku Seiken",
        "Nanto GoshaSei ",
        "Hokuto Shinken",
        "Hokuto Ryuken",
        "3"
    ],
    ["Dans Olive et Tom comment s'appelle le personnage principal ?",
        "Tsubasa Ōzora",
        "Genzō Wakabayashi",
        "Takeshi Sawada",
        "Kojirō Hyūga",
        "1"
    ],
    ["Dans Fairy Tail quelle guilde n'existe pas",
        "Saber Tooth",
        "Lamia Scale",
        "White Pegasus",
        "Titan Nose",
         "3"
    ],
    ["Quelle est la forme ultime des Zanpakutō dans Bleach",
        "Shikai",
        "Shohai",
        "Bankai",
        "Baka",
        "3"
    ]
]
let questionArray = [];

/**
 * initialise the quizz after the choice
 */
function initialise (quizz){
    if (quizz === "kaamelott") {
        kaamelott.forEach(item => {
            questionArray.push(new Question(item[0], item[1], item[2], item[3], item[4], item[item[5]]));
        });
    } else if (quizz === "manga") {
        manga.forEach(item => {
            questionArray.push(new Question(item[0], item[1], item[2], item[3], item[4], item[item[5]]));
        });
    }
    addQuestion(questionArray[ind]);
}

/**
 * active the quizz choice
 */
function choiceQuizz() {
    ind =0;
    score = 0;
    answer.children().remove();
    addDiv("Manga","select");
    addDiv("Kaamelott","select");
    select = $(".select");
    select.css("text-align","center");
    question.children().remove();
    select.click(function (){
        answer.children().remove();
        initialise($(this).html().toLowerCase());
    });
}

/**
 * add div
 * @param {string} title
 * @param {string} clas
 */
function addDiv(title,clas){
    answer.append("<div class="+clas+">"+title+"</div>");
}

/**
 * add question and the choice
 *
 * @param quest
 */
function addQuestion(quest){
    question.html(quest.getQuestion());
    let choiceArray = quest.getChoice();
    for (let i = 0 ; i < choiceArray.length ; i++){
        addDiv(i+1+". "+choiceArray[i],"choice")
    }
    $(".choice").click(function (){
       test($(this).html().substr(3));
    });
}

/**
 * test if the answer is right
 * @param ans
 */
function test(ans){
    answer.children().remove();
    if (ans === questionArray[ind].getAnswer()){
        score ++;
        console.log("score "+score);
    }
    else{
        wrongAnswer.push(questionArray[ind].getQuestion()+"<br>"+questionArray[ind].getAnswer()+"<br>");
        console.log(wrongAnswer)
    }
    if (ind < (questionArray.length-1)){
        ind++;
        addQuestion(questionArray[ind])
    }
    else {
        end();
    }
}

/**
 * display the result
 */
function end(){
    question.html("<div>Votre score : "+score+" / "+questionArray.length+"</div>");
    question.append("<button>Restart</button>")
    wrongAnswer.forEach(item => {
        addDiv(item,"choice2");
    });
    $("button").click(function () {
        choiceQuizz();
    });
}

choiceQuizz();
