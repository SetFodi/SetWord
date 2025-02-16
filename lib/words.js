// lib/words.js

// Solution words - carefully curated list of common 5-letter words
export const solutions = [
  // Everyday words
  "about", "above", "apple", "award", "beach", "black", "block", "bread", "break", "bring",
  "broad", "brush", "candy", "chair", "clean", "clear", "clock", "cloud", "crash", "crazy",
  "dance", "dream", "earth", "empty", "enemy", "event", "every", "flame", "floor", "fresh",
  "fruit", "glass", "grape", "great", "green", "happy", "heart", "horse", "house", "human",
  "image", "juice", "knife", "learn", "light", "lunch", "major", "match", "money", "music",
  "night", "ocean", "order", "paint", "paper", "party", "peace", "piano", "place", "plant",
  "power", "prize", "queen", "quick", "radio", "reach", "river", "robot", "score", "serve",
  "shake", "share", "shirt", "short", "shore", "skill", "sleep", "small", "smart", "smile",
  "snake", "solid", "sound", "space", "spend", "sport", "stage", "stand", "start", "steam",
  "stone", "storm", "study", "sugar", "table", "thank", "tiger", "touch", "train", "trust",
  "video", "visit", "voice", "watch", "water", "wheel", "white", "world", "write", "young",
  
  // Common objects
  "alarm", "bacon", "badge", "baker", "bases", "bible", "blade", "blank", "blend", "blood",
  "boost", "booth", "brain", "brand", "brass", "brave", "bread", "breed", "brick", "cable",
  "carry", "catch", "chain", "chart", "chase", "check", "chest", "chief", "child", "china",
  "class", "click", "coast", "count", "court", "cover", "crash", "cream", "crime", "cross",
  "crowd", "crown", "curve", "cycle", "depth", "disco", "drama", "dream", "dress", "drink",
  "eagle", "eight", "elite", "fence", "field", "fight", "fifty", "flame", "flood", "focus",
  "frame", "ghost", "glove", "grain", "grand", "grass", "group", "guest", "habit", "hotel",
  "human", "ideal", "image", "jelly", "knife", "lemon", "level", "liver", "loose", "lunar",
  "magic", "mayor", "medal", "metal", "meter", "motor", "movie", "music", "noble", "noise",
  "novel", "ocean", "opera", "orbit", "organ", "panda", "panel", "panic", "peace", "pearl",
  "photo", "piano", "pinky", "pound", "power", "pride", "prize", "quest", "quiet", "racer",
  "radio", "rally", "raven", "razor", "rider", "river", "robot", "rocket", "salad", "scale",
  "score", "scope", "sense", "sheep", "shelf", "shore", "shout", "skill", "skirt", "smile",
  "solar", "space", "spade", "spine", "spoon", "stack", "stage", "storm", "sugar", "table",
  "tempo", "tense", "tiger", "torch", "touch", "tough", "train", "trick", "trump", "tutor",
  "uncle", "union", "value", "vapor", "venue", "video", "villa", "visit", "vocal", "voice",
  "wagon", "waste", "watch", "water", "whale", "wheel", "while", "whole", "world", "yacht",
  
  // Technology terms
  "audio", "cache", "click", "cloud", "email", "error", "files", "image", "input", "login",
  "media", "mouse", "pixel", "power", "print", "pulse", "reset", "scale", "setup", "share",
  "sound", "steel", "trace", "video"
].filter((word, index, self) => self.indexOf(word) === index); // Remove duplicates


// Additional valid words that aren't solutions
const additionalWords = [
  "about", "above", "abuse", "actor", "acute", "admit", "adopt", "adult", "agent", "agree",
  "ahead", "alarm", "album", "alert", "alike", "alive", "allow", "along", "alpha", "alter",
  "amber", "amend", "angle", "angry", "ankle", "apple", "apply", "arena", "arise", "array",
  "aside", "asset", "audio", "avoid", "award", "aware", "awful", "bacon", "badge", "badly",
  "baker", "bases", "basic", "basis", "beach", "began", "begin", "begun", "being", "below",
  "bible", "birth", "black", "blade", "blame", "blank", "blast", "blend", "bless", "blind",
  "block", "blood", "board", "boost", "booth", "bound", "brain", "brake", "brand", "brass",
  "brave", "bread", "break", "breed", "brief", "bring", "broad", "broke", "brown", "build",
  "built", "buyer", "cable", "calif", "carry", "catch", "cause", "chain", "chair", "chart",
  "chase", "cheap", "check", "chest", "chief", "child", "china", "chose", "civil", "claim",
  "class", "clean", "clear", "click", "clock", "close", "coach", "coast", "could", "count",
  "court", "cover", "craft", "crash", "cream", "crime", "cross", "crowd", "crown", "curve",

];

// Combine solutions with additional words and remove duplicates
export const validWords = [...new Set([...solutions, ...additionalWords])];

// Function to check if a word is valid
export const isValidWord = (word) => validWords.includes(word.toLowerCase());

// Function to get a random solution
export const getRandomSolution = () => {
  return solutions[Math.floor(Math.random() * solutions.length)].toUpperCase();
};

// Function to get daily solution
export const getDailySolution = () => {
  const epochMs = new Date('2024-01-01').getTime(); // Updated epoch date
  const now = Date.now();
  const msInDay = 86400000;
  const index = Math.floor((now - epochMs) / msInDay) % solutions.length;
  return solutions[index].toUpperCase();
};