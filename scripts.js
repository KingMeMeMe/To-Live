var candles = 0;
var unlit_candles = 0;
// let unlit = false;
const candle_container = document.getElementById('candle_container');

const candle_story = document.getElementById('candle_story');

const darkness = document.getElementById('darkness');

const pronoun_options = [
    ["he", "him", "his", "himself"],
    ["she", "her", "her", "herself"],
    ["they", "them", "their", "themself"],
    ["xe", "xem", "xyr", "xyrself"],
    ["ze", "zir", "zirs", "zirself"]
]

const word_dict = {
    'colors':['red','orange','yellow','green','blue','indigo','violet','pink',
              'black','white','grey','rainbow'],
              
    'foods': ['congee','ramen','dumplings','mochi','lasagna','ravioli','soup',
              'salad','cereal','roast beef','curry','tacos','quesadillas',
              'chowder','oranges','peaches','watermelon','apples','dimsum',
              'pickles','croissants','pound cake'],

    'drinks':['lattes','coffee','espresso','tea','green tea','matcha',
              'horchata','eggnog','fruit juice','soda','orange soda','cream soda',
              'fruit smoothies','hot chocolate','milk','chocolate milk','strawberry milk',
              'milkshakes','water','cider','seltzer','sugar cane juice', 'pina coladas',
              'orange juice'],

    'movies':['The Godfather','Into the Spiderverse','Casablanca','Spirited Away',
              'Reservoir Dogs','The Reanimator','Little Shop of Horrors',
              'Havoc in Heaven','Toy Story','Frozen','Megamind','Back to the Future',
              'Infernal Affairs','The Princess Bride','Knives Out','Wizard of Oz',
              'Jurassic Park','Jaws','Everything Everywhere All at Once'],

    'fears':['the dark','being alone','being forgotten','bugs','insects','clowns',
             'blood','vomitting','crowds','enclosed spaces','heights','death',
             'change','being outed','walking home alone','walking alone at night',
             'going home','being noticed'],

    'guilty_pleasures': ['eating a ton of junk food','watching an entire season of a show in one sitting',
                         'spending a weekend only sleeping','torrid romance novels',
                         'taking personality quizzes','spending too much time on social media',
                         'eating desert before dinner','buying scented candles',
                         'listening to cheesy music', 'B-list horror flicks',
                         'playing video games for hours on end',
                         'buying new sketchbooks when the last one still hasn’t been filled',
                         'buying novelty stationary'],

    'hobbies':['video games','sewing','crocheting','music','making music',
               'singing','art','painting','drawing','animating','comics','manga',
               'anime','old movies','chess','checkers','football','soccer',
               'baseball','kickball','running','fitness','cooking','reading',
               'gardening','traveling','scrapbooking','photography','yoga',
               'crosswords','sudoku','coding','fashion','doing make-up'],

    'careers':['doctor','veternarian','EMT','lawyer','attorney','prosecutor','artist',
               'programmer','musician','streamer','director','teacher','parent',
               'entrepreneur','athlete','professional soccer player','firefighter',
               'biologist','scientist','chemist','physicist','author','translator',
               'game dev','food critic','film critic','chef','fashion designer',
               'party planner','librarian','researcher','therapist','counselor',
               'a good person','someone to be proud of','construction worker', 'parent'],

    'feelings':['happy','sad','tired','angry','distraught','listless'],

    'locations':['the beach','the movies','the county fair','the mall with friends',
                 'the local diner','clinic'],

    'significant_others':['girlfriend','boyfriend','joyfriend','partner','significant other','lover'],

    'actions': ['bake','sew','play the guitar','shave','do makeup','dress better',
                'socialize again','live','live a little','be proud','stop feeling ashamed',
                'draw','braid hair','style a beard','cook'],

    'bad_habits': ['procrastinating', 'forgetting to reply to texts', 'buying too many fruits and letting them go bad',
                   'staying up too late','showing up late','nail-biting','dwelling on the past','overthinking things',
                   'saying yes to everything','setting expectations too high'],

    'relatives': ['grandmother','grandfather','aunt','uncle','favorite myth','family tradition']
}

// getRandomInt from Mozilla MDN
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
  }


function age_generation(){
    // Though the API I use to generate a name has an option to also generate an age,
    // I chose to generate age separately to more accurately reflect the rates
    // of violence affecting the trans community in the US today.
    // According to a 2023 HRC Foundation Report, 78.8% of trans people killed in
    // the US in the past year were under the age of 35.
    // https://reports.hrc.org/an-epidemic-of-violence-2023

    ages = [getRandomInt(11,35), getRandomInt(35,75)];

    if ((Math.random()*100) <= 78.8) {
        return ages[0]
    } 
    return ages[1]

    // The younger cut-off age is not the 'youngest age a trans person can be'
    // but rather, the youngest age found reported in a case of violence,
    // with the case of Jayden Miller.
    // https://tdor.translivesmatter.info/reports/2023/05/05/jayden-miller_edmonton-alberta-canada_949029ea 
    // Likewise for the older cut-off age, with the case of Juiliana Chávez Flores.
    // https://tdor.translivesmatter.info/reports/2023/06/20/juiliana-chavez-flores_aguas-verdes-zarumilla-peru_ff43411f 
}

const sentence_structures = [
    ['pronouns2', 'favorite color is','colors'],
    ['pronouns2', 'favorite food is', 'foods'],
    ['pronouns2', 'favorite drink is', 'drinks'],
    ['pronouns2', 'favorite movie is', 'movies'],
    ['pronouns0', 'is/are', 'afraid of','fears'],
    ['pronouns2', 'guilty pleasure is', 'guilty_pleasures'],
    ['name', 'really enjoys', 'hobbies'],
    ['pronouns0', 'is/are', 'not the best at', 'hobbies'],
    ['pronouns0', 'is/are', `going to turn ${age_generation().toString()} this year`],
    ['pronouns0', 'is/are','feelings'],
  
    ['name', 'wants to be a', 'careers'],
    ['pronouns0', 'wants', 'to go to', 'locations', 'this weekend'],
    ['pronouns0', 'is/are', 'going out tonight'],
    ['name','is going jogging this afternoon'],
    ['pronouns0', 'wants', 'to propose to', 'pronouns2', 'significant_others'],
    ['pronouns0', 'wants','to leave the world a better place. But','pronouns0','is/are','still trying to find','pronouns2','own footing for now'],
  
    ['pronouns0', 'just got an A on', 'pronouns2', 'last paper'],
    ['name', 'just won silver at regionals'],
    ['pronouns0', 'just reached six months sober'],
    ['pronouns0', 'just got an interview booked for', 'pronouns2', 'dream job'],
    ['pronouns0', 'is/are', 'looking forward to adopting a guide dog'],
    ['pronouns0', 'just got a promotion'],
    ['pronouns0', 'just started learning how to', 'actions'],
    ['pronouns0', 'is/are', 'going back to school'],
    ['name','took a visit to','pronouns2','hometown last week, and people said','pronouns0','looks much happier now'],
    ['pronouns0','is/are','finally beginning to feel comfortable in','pronouns2','own skin'],
  
    ['People say that', 'name', 'is incredibly thoughtful'],
    ['The local grannies and aunties love', 'name',', since', 'pronouns0', 'often helps them cross the street'],
    ['pronouns0', 'often does community service on weekends'],
    ['pronouns0', 'is/are', 'always the person to take the lead in group projects'],
  
    ['pronouns2', 'mother has been having disagreements with','pronouns1','as of late'],
    ['Things haven’t been the best with', 'pronouns2', 'father lately'],
    ['pronouns2', 'coworkers have been treating','pronouns1','a bit differently lately'],
    ['name','is about to get in an Uber'],
    ['There‘s someone on','pronouns2', 'block who is giving','pronouns1','weird looks'],
    ['pronouns2','significant_others','has been acting differently lately'],
    ['Things haven‘t been the same lately'],
    ['There‘s someone','name','knew in the newspaper this morning.','name','doesn‘t know how to feel'],
    ['name','took a visit to','pronouns2','hometown last week, and people weren‘t the friendliest'],
    ['pronouns2','family says they‘re mourning, but','name','is still right here'],
    ['pronouns2', 'best friend doesn‘t look at','pronouns1','the same way anymore' ],
  
    ['pronouns0', 'is/are', 'a bit too snarky'],
    ['pronouns0', 'has a bad habit of', 'bad_habits'],
    ['pronouns0', 'just got in a fight with', 'pronouns2','significant_others'],
    ['name', 'didn’t do too well on', 'pronouns2', 'last test'],
    ['pronouns0', 'is/are', 'not too fond of', 'pronouns2', 'current job'],
    ['pronouns0', 'is/are', 'thinking of moving somewhere else soon'],
  
    // ['Last night,', 'pronouns0', 'spent a few hours falling into a Wikipedia rabbit hole and read a lot about', await get_wiki()],
    ['Today ', 'pronouns0', 'wants to pick up', 'foods', 'from the local grocery store'],
    ['pronouns0', 'just stepped in a puddle and is trying not to concentrate on how wet', 'pronouns2', 'sock feels'],
    ['pronouns0', 'was woken up by', 'pronouns2', 'cat at 2AM last night'],
    ['There’s a rock in', 'pronouns2', 'shoe and', 'pronouns0', 'is/are', 'waiting for a good time to shake it out']
  ]
  
const names = [
      ['pronouns0', 'chose that name', 'pronouns3'],
      ['pronouns0', 'proudly chose that name', 'pronouns3'],
      ['The name came from', 'pronouns2','relatives'],
      ['The name‘s not too special'],
      ['name','is still kinda growing into this name'],
      ['It‘s the same old name', 'name','has always had'],
      ['pronouns0', 'is/are','rethinking the name lately']
  ]

async function get_wiki(){
    const url = "https://en.wikipedia.org/api/rest_v1/page/random/title"
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const entry = await response.json();
        return entry["items"][0]["title"].replace(/_/g, " ");
      } catch (error) {
        console.error(error.message);
      } 
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// weighted_random by rydwolf
// https://stackoverflow.com/a/55671924
function weighted_random(items, weights) {
    var i;

    for (i = 1; i < weights.length; i++){
        weights[i] += weights[i-1];
    }

    var random = Math.random() * weights[weights.length - 1];

    for (i = 0; i < weights.length; i++){
        if (weights[i] > random){
            break;
        }
    }

    return items[i];
}

function generate_pronouns(name_leaning){
    // Although people often choose names with a presentation with a societal lean
    // towards their preferred pronouns, this is not always the case.
    // This could be due to personal attachment to a birthname or a dangerous
    // situation forcing one to stay partially, or completely, in the closet.
    // In a project like this, I felt it was especially important to include this
    // diversity in the trans experience, rather than assigning pronouns based
    // purely on what is 'expected.'
    var choice_weight = [2,65,20,4,4];
    if (name_leaning == 'male'){
        choice_weight = [65,2,20,4,4]
    }
        
    const pronouns = weighted_random(pronoun_options, choice_weight)
    return pronouns
}

function get_word(part_of_speech, name, pronouns){
    if (part_of_speech.substring(0, 8) == 'pronouns') {
        return pronouns[Number(part_of_speech.substring(8))];
    }
    else if (part_of_speech == 'name') {
        return name;
    }
    else if (part_of_speech == 'is/are'){
        if( pronouns[0] == 'they'){
            return 'are';
        }
        else {
            return 'is';
        }
    }
    else {
        return randomChoice(word_dict[part_of_speech])
    }     

}


function verb_filter(part_of_speech, pronouns){
    // This, along with the "is/are" code, were important for me to get right
    // So that people using they/them pronouns would still sound natural with the preset sentence structures.
    if ((pronouns[0] != 'they') || (part_of_speech.includes(' '))){
        return part_of_speech;
        }
    else {
        return part_of_speech.substring(0, part_of_speech.length-1);
    }
}

function wordReplacer(part_of_speech, name, pronouns) {
    if ((Object.hasOwn(word_dict,part_of_speech)) || (part_of_speech.substring(0,8) == 'pronouns') || part_of_speech == 'name' || part_of_speech == 'is/are') {
        
        const word = get_word(part_of_speech, name, pronouns);
        // document.getElementById('i_tracker').insertAdjacentHTML('beforeend', word); 
        
        return word;
    } 
    else {
        const word = verb_filter(part_of_speech, pronouns);
        // document.getElementById('i_tracker').insertAdjacentHTML('beforeend', word); 
        
        return word;
    }
}

function name_quip(name, pronouns){
    const sentence_structure = randomChoice(names);
    
    const filled_sentence = sentence_structure.map((part_of_speech) => wordReplacer(part_of_speech, name, pronouns))
    // document.getElementById('i_tracker').innerHTML = filled_sentence;
    var sentence = filled_sentence.join(' ');

    return sentence.charAt(0).toUpperCase() + sentence.substring(1);
}

async function generate_person(){
    const url = "https://randomuser.me/api/?inc=gender,name,nat=us,ca,nz"
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const id = await response.json();
        return id;
      } catch (error) {
        console.error(error.message);
      } 
}


function generate_line(name, pronouns){
    const sentence_structure = randomChoice(sentence_structures);

    var filled_sentence = sentence_structure.map(part_of_speech => wordReplacer(part_of_speech, name, pronouns))
    var sentence = filled_sentence.join(' ');
    
    return sentence.charAt(0).toUpperCase() + sentence.substring(1);
}

async function generate_bio(){
    var unlit = false;
    document.getElementById("story").innerHTML = "";

    const id = await generate_person();
    const name = id['results'][0]['name']['first'];
    const pronouns = generate_pronouns(id['results'][0]['gender']);
    const bio_length = getRandomInt(8, 10);

    for (let i = 0; i < bio_length; i++){
       if (i == 0) {
        document.getElementById("story").insertAdjacentHTML('beforeend', `This is ${name}.`);

        if (Math.random() < 0.45) {
            document.getElementById("story").insertAdjacentElement('beforeend', document.createElement("br"));
            document.getElementById("story").insertAdjacentHTML('beforeend', `${name_quip(name,pronouns)}.`);
        }
       
       }
       else {
        const line = generate_line(name, pronouns);
        document.getElementById("story").insertAdjacentElement('beforeend', document.createElement("br"));
        if ((i == bio_length - 1) && Math.random() > 0.5){
            document.getElementById("story").insertAdjacentHTML('beforeend', line.substring(0, line.length-1)+'-');
            unlit = true;
        }
        else {
            document.getElementById("story").insertAdjacentHTML('beforeend', line+'.');
        }
       }
    }

    return unlit
}



async function lightACandle() {
    candles += 1;
    document.getElementById('candle_count').innerHTML = candles;
    var unlit = await generate_bio();

    var darkness_level = window.getComputedStyle(darkness).getPropertyValue("opacity");

    let candle = document.createElement("img");
    candle.dataset.txt = document.getElementById("story").innerHTML;
    candle.classList.add('candle');
    if (unlit) {
        unlit_candles += 1;
        candle.src = 'static/candleUnlit_test.png'

    } else {
        candle.src = 'static/candle_test.png'
        darkness.style.opacity = (darkness_level - 0.025);
    }

    candle.style.filter = 'drop-shadow(3px -5px 2px rgba(15, 15, 23, 0.749)'
    candle.style.transform =`translateX(${getRandomInt(-7, 7)}px) translateY(${getRandomInt(-5, 5)}px)`;
    
    candle_container.append(candle);

}

candle_container.addEventListener("mouseover", function(el){
    if (el.target.classList.contains("candle")) {
        const target = el.target;
        console.log(target.dataset.txt);

        var x = el.clientX,
        y = el.clientY;

        candle_story.style.top = (y + 5) + 'px';
        candle_story.style.left = (x + 5) + 'px';

        candle_story.innerHTML = target.dataset.txt;
        candle_story.style.display = 'block';
    } else {
        candle_story.innerHTML = '';
        candle_story.style.display = 'none';
    }
})
