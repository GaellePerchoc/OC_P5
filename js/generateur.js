// Enchaînement des pages du générateur : ouverture, programme, fermeture
var accueil = document.getElementById("msgAccueil");
var close = document.getElementById("close");
var aurevoir = document.getElementById("msgAurevoir");

accueil.addEventListener("click", function(e){
	accueil.style.display = "none";
	generateur.style.display="inherit";
	e.stopPropagation();
})

close.addEventListener("click", function(e){
	generateur.style.display="none";
	aurevoir.style.display="inherit";
	e.stopPropagation();
})

 aurevoir.addEventListener("click", function(e){
 	aurevoir.style.display = "none";
 	generateur.style.display="inherit";
 	e.stopPropagation();
 })


// Générateur
/* Le générateur crée de courtes histoires. 
Il est possible de choisir entre des histoires classiques, peuplées d'animaux réels, et des histoires fantastiques, peuplées de créatures imaginaires. 
Les phrases se structurent de la manière suivante : 
Complément de tps + Complément de lieu* + Sujet* + Adjectif qualificatif + Verbe. + Adverbe + Verbe + Adjectif qualificatif* + Sujet* + Complément.
Les éléments suivis de l'étoile (*) sont les éléments qui sont modifiés pour générer des histoires fantastiques.
*/

// Tableaux des parties de phrases composant les histoires classiques
var elmt1 = ["Jadis,","Naguère,","C’était il y a longtemps, si longtemps que je m’en souviens mal, mais","Il fut un temps, où les poules avaient des dents et les chiens n’en avaient pas et","Autrefois,", "C’est un temps que les moins de 20 ans ne peuvent pas connaître… Mais,", "À une époque pas si lointaine,", "En ces temps-là,", "En ces temps passés et oubliés,"];
var elmt2 = ["aux confins des mers septentrionales,","dans les bas-fond des marécages de Groléjac,","au royaume du roi Gradlon,","dans le coeur trépidant du vieux Hanoï,","sur les hauteurs de l’Annapurna,", "dans la forêt de Paimpont,", "aux abords des châteaux de la Loire,", "par delà les montagnes de l’Himalaya,", "vingt milles lieues sous les mers du Pôle Nord,", "au fin fond du gouffre de Padirac,"];
var elmt3 = ["un hippopotame","un opossum","un impala","un orignal","un balbuzard", "un lémurien", "un chinchilla", "un flamant rose", "un perroquet", "un fourmilier"];
var elmt4 = ["facétieux", "exalté", "sacarstique", "un peu cloche", "médusé", "excentrique", "tourmenté", "maléfique", "généreux", "capricieux"];
var elmt5 = ["se délectait d’une purée de légumes-racines.", "dissertait sur le non-sens d’incorporer des petits pois au guacamole.", "trouvait refuge dans une manufacture de porcelaine.", "désespérait de l’arrivée d’une cargaison de papier mâché.", "s’essayait au french cancan.", "composait des boléros à un rythme frénétique.", "noyait son chagrin dans les vapeurs de sa cigarette électronique.", "étudiait l’impact du trafic des oies sauvages sur le cours du Dow Jones.", "planifiait son prochain vol à bord d’un aéronef dernier cri.", "avait perdu la mémoire immédiate."];
var elmt6 = ["Quand soudain,","Quand, tout à coup,","Quand, brusquement,", "Et, subitement,","Et, sans prévenir,", "Et, sans crier gare,", "Quand, à l’improviste,", "Lorsque, sans tambour, ni trompette,", "Et, en catimini,", "Quand, discrètement,"];
var elmt7 = ["surgit","apparut", "disparut", "monta sur scène", "déboula", "s’approcha", "s’enfuit", "s’éclipsait", "s’évanouit", "se leva"];
var elmt8 = ["un fringant","un jeune","un curieux","un courageux","un ignoble", "un éblouissant", "un grossier", "un triste", "un intrépide", "un discret"];
var elmt9 = ["poney","alligator","chimpanzé","tigre du Bengale","mollusque", "toucan", "mouflon", "hamster", "koala", "hibou"];
var elmt10 = ["en quête d’amour.","fort en colère.","en robe de chambre.","déclamant des vers en alexandrin.","visiblement en hypoglycémie", "en marche arrière.","en désaccord majeur avec son ombre.", "en panne d’inspiration.", "pieds nus et ventre à l’air.", "esquissant quelques pas de flamenco." ];

// Tableaux des parties de phrases composant les histoires fantastiques
var elmtCF2 = ["dans la cabane de Baba Yaga,","prisonnier du Val Sans Retour,","sur les rives du Styx,","dans le coeur trépidant du vieux Goda Zavala,","sur les hauteurs de la montagne du destin,", "dans les contrées perdues de Garam-Masala,", "quinze mille lieux sous les mers argentées de Tropézie orientale,", "par delà les terres maudites du Comte de Mohrmuker,", "à la croisée des mondes obscurs,", " dans les geôles du diable jaune,"];
var elmtCF3 = ["un elfe","un troll","un fantôme","un phœnix","un basilic", "un monocéros", "un dragon", "un warabouc", "un centaure", "un bugul-noz"];
var elmtCF8 = ["une suprenante","une fabuleuse","une étrange","une intrigante","une drôle de", "une sinistre", "une vieille", "une brave", "une angoissante", "une sacrée"];
var elmtCF9 = ["salamandre","licorne","sirène","chèvre d’or","sorcière","fée", "goule", "manticore", "ogresse", "ganipote"];

var phrase = [elmt1, elmt2, elmt3, elmt4, elmt5, elmt6, elmt7, elmt8, elmt9, elmt10]; // Tableau multidimensionnel qui regroupe, dans l'ordre de la structure de l'histoire, les tableaux des différentes parties de phrases
var phraseCF = [{indice:1, phrase: elmtCF2},{indice:2, phrase:elmtCF3},{indice:7, phrase:elmtCF8},{indice:8, phrase:elmtCF9}];

// Déclaration des variables
var index;
var nbElmt = elmt1.length; // Chaque tableau (hormis les tableaux multidimenssionnels) contient le même nombre d'éléments, peu importe le tableau auquel on se réfère

// Fonction qui génére un nombre aléatoire dans un intervalle donné
function nbAleatoire (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random()*(max - min + 1) + min);
}

// Fonction qui génére les histoires classiques
function creerConte() {

	var histoire = [ ]; // Tableau vide qui accueillera les morceaux de phrases composant l'histoire

	// Boucle qui produit le tableau "histoire" en allant chercher dans le tableau multidimensionnel les différentes parties de phrases
	for(var i=0 ; i < phrase.length; i++){	
		index = nbAleatoire(0, nbElmt-1); // Index Aléatoire
		histoire.push(phrase[i][index]); // Insère les morceaux de phrases dans le tableau histoire
	}

	return histoire;
}

// Fonction qui génère les histoires fantastiques
function creerConteCF (){

	var histoire = creerConte(); // Génère une histoire classique

	for(var i=0; i < phraseCF.length ; i++) {
    	index = nbAleatoire(0, nbElmt-1);
    	histoire.splice(phraseCF[i].indice, 1, phraseCF[i].phrase[index]);
  	}

	return histoire;

}

// Fonction qui permet l'affichage des histoires dans la console en fonction du type d'histoires demandées 
function afficherConte(typeConte) {
	
	var conte;

	switch(typeConte) {
		case "classique": // Histoires classiques
			conte = creerConte();
			break;
		case "fantastique": // Histoires fantastiques
			conte = creerConteCF();
			break;
		default:
		console.log("Je n'ai pas compris ta demande ! Peux-tu recommencer ?");	
	}

	conte = conte.join(" ");
	console.log(conte);
	return conte;

}

// On récupère les données du formulaire
var form = document.querySelector("form");

form.addEventListener("submit", function(e){

	var conteDiv = document.getElementById("histoires");
	var typeConte = form.elements.categorie.value;
	var nbConte = Math.floor(form.elements.nombre.value);
	
	var conte;

	conteDiv.innerHTML = " ";

	e.preventDefault();

	if(nbConte) {

		if (nbConte > 5) {
			nbConte = 5;
			var choixNbConte = document.querySelectorAll("#radio > input");
			for(var i=1 ; i <= choixNbConte.length ; i++){
				choixNbConte.value = i;
			}
		}

		for(var i =1 ; i <= nbConte ; i++){

			conte = afficherConte(typeConte);
			var divElt = document.createElement("div");
			divElt.textContent = conte;
			divElt.classList.add('histoire');

			if(typeConte === "classique") {
				divElt.style.borderTop = "3px solid #BDBDBE";
			} else if (typeConte === "fantastique") {
				divElt.style.borderTop = "3px solid #D2C7C7";
			}

			conteDiv.appendChild(divElt);
		}
	}
})




