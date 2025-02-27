export const slideOneExamples = [
	{
		title: "Counterfeit malaria medicine",
		body:
			"Malaria is a life threatening disease transmitted by mosquitoes carrying parasites. " +
			"Beyond threatening millions, particularly in Nigeria, recovery is hampered by fake anti-malarial medicine. In 2011, a World Health Organization (WHO) survey revealed that 64% of the malaria medicine imported in Nigeria were fake. " +
			"Want to learn more about this problem of counterfeit drugs and how it has changed over time? You can read more about this",
		slug: "malaria",
		readMoreLink: "https://theconversation.com/fake-drugs-are-one-reason-malaria-still-kills-so-many-92712",
		readMoreText: "in this article from the Conversation.",
	},
	{
		title: "Stealing in video games as form of “griefing”",
		body:
			"Have you played a multiplayer game where a teammate played the games in unintended ways to upset you and others?" +
			"Upsetting other players without any in-game rewards is called griefing and makes games less fun for others." +
			"Games such as Minecraft, where griefers can destroy other player creations with fire or steal from others, can have entire game modifications" +
			" dedicated to the detection and prevention of griefing. If you want to learn more about the problem of griefing, check out",
		slug: "game",
		readMoreLink: "https://www.kidas.net/post/toxic-gaming-behavior-griefing",
		readMoreText: "this Kidas article on Griefing. ",
	},
	{
		title: "Factory-made fakes of hand-made traditions in clothing, jewelry, etc",
		body:
			"We all know that eating meals that are homemade can often be healthier than heavily processed meals, such as those made in factories." +
			"But sometimes it can be difficult to tell the difference. Would you like to know a few ways to tell just from the ingredients? Read more in",
		slug: "lunch",
		readMoreLink: "https://www.healthline.com/nutrition/junk-food-vs-healthy-food#what-are-highly-processed-foods",
		readMoreText: "this Healthline article. ",
	},
];

export const slideOneConcepts = {
	energy: {
		label: "Excessive energy use in a home",
		isCorrect: true,
		hint: "Mmmm, maybe reconsider if excessive energy use is considered a classification problem?",
		afterthought: "Yes! Using more than acceptable amounts of energy is an excessive category of use",
	},
	meal: {
		label: "Deciding if a meal is homemade or factory made",
		isCorrect: true,
		hint: "Mmmm, maybe reconsider if deciding how a meal is made is considered a classification problem?",
		afterthought:
			"Yes! A meal is either made at home or can be made in many other places. One place is in a food processing plant.",
	},
	noise: {
		label: "Neighbors being too noisy",
		isCorrect: true,
		hint: "Mmmm, maybe reconsider if noisy neighbors being too noisy is considered a classification problem?",
		afterthought:
			"Yes! For example, if neighbors were louder than, say a vacuum cleaner in your home, then many would say they were being noisy.",
	},
	tomato: {
		label: "If a tomato plant has received enough water for a given week",
		isCorrect: true,
		hint: "Mmmm, maybe reconsider if the tomato plant receiving enough water is considered a classification problem?",
		afterthought: "Yes! Yellowing of leaves indicates lack of water for tomato plants.",
	},
};

export const slideTwoExamples = [
	{
		title: "Counterfeit malaria medicine",
		brief:
			"Malaria medicine bottles can appear differently under UV light. The visual difference can create a binary classification problem for use to study with AI.",
		body: "Malaria is a life threatening disease transmitted by mosquitoes carrying parasites. Beyond threatening millions, particularly in Nigeria, recovery is hampered by fake anti-malarial medicine. In 2011, a World Health Organization (WHO) survey revealed that 64% of the malaria medicine imported in Nigeria were fake.  In the images below both drug bottles appear nearly identical under normal lighting conditions. But under UV light there are stark differences between the two categories of real or fake medicine. Which bottle do you think is real and which one is fake?",
		img_a: "alli_a.png",
		img_b: "alli_b.png",
	},
	{
		title: "Stealing in video games as form of “griefing”",
		brief:
			"In the popular multiplayer game MineCraft groups of players can band together to upset other players by doing damage to their structures, an act called griefing. But structural damage can happen naturally too. ",
		body: "Have you played a multiplayer game where a teammate played the games in unintended ways to upset you and others?Upsetting other players without any in-game rewards is called griefing and makes games less fun for others.Games such as Minecraft, where griefers can destroy other player creations with fire or steal from others, can have entire game modifications dedicated to the detection and prevention of griefing.",
		img_a: "game_a.png",
		img_b: "game_b.png",
	},
	{
		title: "Factory-made fakes of hand-made traditions in clothing, jewelry, etc.",
		brief:
			"The texture and colors present in a given meal can often visually indicate whether a meal was homemade or factory made",
		body: "In 1992 the Smithsonian was caught selling factory-made fakes of the famous African American Gee’s Bend quilts. Weavers from all over the nation protested, and they were forced to eliminate them from their store. Less well know are cases like the lawsuit from the Navajo Nation against Urban Outfitters. In the west African nation of Ghana it is common to see tourists who think they are buying the local weaving, kente cloth, only to find it is a factory fake. University of Michigan student Kwame Robinson has developed AI that can tell the difference. Which of the below is the real kente, and which is the factory fake?",
		img_a: "food_a.png",
		img_b: "food_b.png",
	},
];

export const slideTwoConcepts = {
	apple: {
		label: "What kind of Apple is this? Apples are divided into Honeycrisp, Golden and Empire",
		isCorrect: false,
		hint: "Apples could be.",
		afterthought: "No! The apple are divided into three, not two categories",
	},
	money: {
		label: "Real or fake money? Dollar bills that are real and counterfeit",
		isCorrect: true,
		hint: "money could be.",
		afterthought: "Yes! Fake and real money are two categories of money.",
	},
	silverware: {
		label: "What is this piece of silverware? Forks, spoons and knives. ",
		isCorrect: false,
		hint: "silverware could be.",
		afterthought: "No! The silverware is divided into three categories.",
	},
	nickel: {
		label: "Is a nickel typical or is it an ultra-rare 1913 one of a kind Liberty nickel?",
		isCorrect: true,
		hint: "",
		afterthought:
			"Yes! Even if one of the two category has only one possible kind it is still a binary classification problem",
	},
};

export const slideThreeConcepts = {
	license: {
		label:
			"An algorithm that associates African Americans with longer jail sentences for same crimes done by other races.",
		isCorrect: true,
		hint: "Mmmm, maybe reconsider the use of the algorithm.",
		afterthought:
			"Yes! This is an example of poor validation performance. We can not say if spurious correlation is the cause but perhaps more diverse data would help.",
	},
	speech: {
		label:
			"When listening to speech from people that stutter, a closed captioning AI maintains successful performance even though it had never seen that data before.",
		isCorrect: false,
		hint: "Mmmm, maybe reconsider the closed captioning AI. This is an example of good validation performance and is not poor validation performance",
		afterthought: "No! This is an example of good validation performance and is not poor validation performance",
	},
	apples: {
		label:
			"An AI is 100 percent correct in classifying two species of apples that are very similar in appearance. The first apple was photographed on a light grey background and the second apple on a white background. ",
		isCorrect: true,
		hint: "Mmmm, maybe reconsider classifying two species of applesI",
		afterthought:
			"Yes! This is an example of likely spurious correlation because the AI likely saw the biggest visual difference in the background color and not the apple itself.",
	},
};

export const slideFourConceptsA = {
	temperature: {
		label: "Developing a temperature sensor that reports ambient heat",
		isCorrect: false,
		hint: "Energy could be.",
		afterthought: "No! Ambient heat is measured and reported as a real number here, not as one or a few categories",
	},
	volunteer: {
		label: "Whether a person is eligible to volunteer for a soup kitchen",
		isCorrect: true,
		hint: "Weight could be.",
		afterthought: "Yes! Eligibility can described as a set of categories a person must meet",
	},
	artwork: {
		label: "Determining if artwork has been plagiarized",
		isCorrect: true,
		hint: "Noise could be.",
		afterthought:
			"Yes! Plagiarism, includes authentic and fake categories to help decide if something has been copied improperly",
	},
	friend: {
		label: "Asking a busy friend if they can provide transportation for you",
		isCorrect: true,
		hint: "Noise could be.",
		afterthought:
			"Yes! In talking to your friend they will say yes or no. Their answer determines if you can get a ride or not",
	},
};

export const slideFourConceptsB = {
	coins: {
		label: "When inserting coins into a vending machine, detecting what of the 6 possible coins it could be.",
		isCorrect: false,
		hint: "Mmmm, maybe reconsider inserting the coins. Pennies, nickels, and dimes make up three categories and there still are other coins.",
		afterthought: "No! Pennies, nickels, and dimes make up three categories and there still are other coins.",
	},
	dialysis: {
		label: "Whether someone needs kidney dialysis or not?",
		isCorrect: true,
		hint: "Mmmm, maybe reconsider kidney dialysis...",
		afterthought:
			"Yes! There are specific Western medical criteria that can be checked and used to tell someone they need to be put on dialysis, or that they do not need it.",
	},
	medicine: {
		label: " Is heart medicine counterfeit or not?",
		isCorrect: true,
		hint: "Mmmm, maybe reconsider counterfeit heart medicine...",
		afterthought:
			"Yes! By learning and modeling the difference between counterfeit and authentic medicine you can decide which category it belongs to",
	},
	// friends: {
	// 	label: "In a group of friends, is anyone yourself?",
	// 	isCorrect: false,
	// 	hint: "silverware could be.",
	// 	afterthought:
	// 		"No! Although this is a strange question, there is only one category of answer: no one else in your friend group is yourself.",
	// },
};

export const slideFourConceptsC = {
	cloudy: {
		label: "For the same crime, an AI gives longer sentences to African Americans than whites.",
		isCorrect: true,
		hint: "Mmmm, maybe reconsider the AI sentencing...",
		afterthought:
			"Yes! This is an example of poor validation performance and spurious correlation. When tested against new data, such as sunny days, the AI starts performing poorly. An AI engineer would say it has not “generalized” well",
	},
	lunches: {
		label:
			"Lunches that sit on square trays are always classified as factory made by an AI even if they were made at home.",
		isCorrect: true,
		hint: "Mmmm, maybe reconsider lunches sitting on square trays... ",
		afterthought:
			"Yes! This is an example of spurious classification. Taking a diversity of other photos is important to avoid spurious classification",
	},
	environmental: {
		label: "When shown an entirely new piece of real kente cloth an AI is able to correctly categorize it as authentic",
		isCorrect: true,
		hint: "Mmmm, maybe reconsider the real kente AI. ",
		afterthought: "Yes! INSERT_RESPONSE_KENTE",
	},
};

export const prompts = {
	kente: {
		title: "Kente Cloth",
		prompt:
			"Detecting real or fake African kente cloth is a problem of great economic significance for the country of" +
			"Ghana. This is because counterfeit kente cloth exists in large numbers and tourists often can not tell the" +
			"difference. The government has tried RFID chips, badges of authentication and other approaches. But" +
			"requiring extra equipment, such as RFID chips or certificates, comes with extra costs. Interestingly," +
			"there are AI algorithms that can analyze images in ways designed by algorithm designers, such as yourself." +
			"How would you design an image based AI app that detected real or fake African kente cloth?",
	},
	water: {
		title: "Flint Water Crisis",
		prompt:
			"The quality of water in Michigan rivers has often raised serious health concerns. Two well known examples" +
			"are the lead water crisis in Flint, Michigan and synthetic forever chemicals, or PFAS, found in Ann Arbor," +
			"MI's Huron river. In both cases citizen compliments came long before a formal water evaluation. How would" +
			"you use AI with binary classification to help categorize citizen complaints to help City officials act" +
			"before a formal evaluation is needed to declare a water quality disaster?",
	},
	web: {
		title: "Artisan Crafters",
		prompt:
			"One way a new website helps connect artisan craters with each other and potential customers is by posting" +
			"volunteer opportunities. In these opportunities an interested customer can volunteer to work for an" +
			"artisan as a way to help them and learn in depth about their work. However, there are many volunteer" +
			"opportunities for many different artisans. Reviewing and managing what volunteers are best matched to what" +
			"artisan is a time consuming job. How would you design an AI to help match volunteers to artisans?",
	},
	malaria: {
		title: "Malaria",
		prompt:
			"Malaria is a life threatening disease transmitted by mosquitoes carrying parasites. Beyond threatening millions of people, " +
			"particularly in Nigeria, recovery from the disease is hampered by fake anti-malarial medicine. " +
			"In 2011, a World Health Organization (WHO) survey revealed that 64% of the malaria medicine " +
			"imported in Nigeria were fake. Want to tackle this problem of counterfeit drugs? " +
			"Using the concepts you've learned try your hand at describing the problem, the binary classification problem and any spurious correlations to acth out for.",
	},
};
