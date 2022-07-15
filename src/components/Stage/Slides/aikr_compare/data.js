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
		title: "Lunches that are homemade or factory made",
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
		body: "In the images below both drug bottles appear nearly identical under normal lighting conditions. But under UV light there are stark differences between the two categories of real or fake medicine. Which bottle do you think is real and which one is fake?",
		img_a: "alli_a.png",
		img_b: "alli_b.png",
	},
	{
		title: "Stealing in video games as form of “griefing”",
		brief:
			"In the popular multiplayer game MineCraft groups of players can band together to upset other players by doing damage to their structures, an act called griefing. But structural damage can happen naturally too. ",
		body: "The first image contains a griefer that is about to set off boxes of TNT inside another player’s structure to cause a house fire. But the second image contains a naturally occurring house fire. Given a house on fire what might be some ways to tell if it was caused by a griefer?",
		img_a: "game_a.png",
		img_b: "game_b.png",
	},
	{
		title: "Lunches that are homemade or factory made",
		brief:
			"The texture and colors present in a given meal can often visually indicate whether a meal was homemade or factory made",
		body: "In this example from our own application, we have home made and factory made meals. Which do you think is home made?",
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
		label: "An AI algorithm trained to read US license plates fails to read license plates from New Mexico.",
		isCorrect: true,
		hint: "bias could be.",
		afterthought:
			"Yes! This is an example of poor validation performance. We can not say if spurious correlation is the cause but perhaps more diverse data would help.",
	},
	speech: {
		label:
			"When listening to speech from people that stutter, a closed captioning AI maintains successful performance even though it had never seen that data before.",
		isCorrect: false,
		hint: "small could be.",
		afterthought: "No! This is an example of good validation performance and is not poor validation performance",
	},
	apples: {
		label:
			"An AI is 100 percent correct in classifying two species of apples that are very similar in appearance. The first apple was photographed on a light grey background and the second apple on a white background. ",
		isCorrect: true,
		hint: "examples could be.",
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
		label: "The denominations of all US coins?",
		isCorrect: false,
		hint: "Apples could be.",
		afterthought: "No! Pennies, nickels, and dimes make up three categories and there still are other coins.",
	},
	dialysis: {
		label: "Whether someone needs kidney dialysis or not?",
		isCorrect: true,
		hint: "money could be.",
		afterthought:
			"Yes! There are specific Western medical criteria that can be checked and used to tell someone they need to be put on dialysis, or that they do not need it.",
	},
	medicine: {
		label: " Is heart medicine counterfeit or not?",
		isCorrect: true,
		hint: "silverware could be.",
		afterthought:
			"Yes! By learning and modeling the difference between counterfeit and authentic medicine you can decide which category it belongs to",
	},
	friends: {
		label: "In a group of friends, is anyone yourself?",
		isCorrect: false,
		hint: "silverware could be.",
		afterthought:
			"No! Although this is a strange question, there is only one category of answer: no one else in your friend group is yourself.",
	},
};

export const slideFourConceptsC = {
	cloudy: {
		label: "An AI is found to reliably detect tanks only on cloudy days",
		isCorrect: true,
		hint: "bias could be.",
		afterthought:
			"Yes! This is an example of poor validation performance and spurious correlation. When tested against new data, such as sunny days, the AI starts performing poorly. An AI engineer would say it has not “generalized” well",
	},
	lunches: {
		label:
			"Lunches that sit on square trays are always classified as factory made by an AI even if they were made at home.",
		isCorrect: true,
		hint: "small could be.",
		afterthought:
			"Yes! This is an example of spurious classification. Taking a diversity of other photos is important to avoid spurious classification",
	},
	environmental: {
		label: "When shown an entirely new product an AI is able to correctly estimate its environmental impact",
		isCorrect: true,
		hint: "examples could be.",
		afterthought: "No! This is an example of good validation performance",
	},
};
