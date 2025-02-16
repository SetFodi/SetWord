// lib/words.js

// Solution words - carefully curated list of common 5-letter words
export const solutions = [
  // Common nouns
  "apple", "beach", "brain", "chair", "clock", "cloud", "dance", "dream", "earth", "flame",
  "floor", "fruit", "ghost", "glass", "grape", "heart", "horse", "house", "juice", "knife",
  "light", "lunch", "money", "music", "night", "ocean", "paper", "party", "phone", "piano",
  "queen", "radio", "river", "robot", "sheep", "shirt", "snake", "space", "storm", "table",
  "tiger", "train", "water", "wheel", "world",

  // Common verbs
  "bring", "build", "carry", "catch", "clean", "climb", "cover", "dance", "drink", "drive",
  "fight", "float", "grant", "guess", "learn", "leave", "paint", "place", "raise", "reach",
  "serve", "shake", "share", "shine", "shoot", "sleep", "speak", "spend", "stand", "start",
  "study", "teach", "thank", "think", "throw", "touch", "train", "treat", "visit", "watch",
  "write",

  // Common adjectives
  "brave", "brief", "bright", "brown", "cheap", "clean", "clear", "close", "crazy", "empty",
  "fresh", "funny", "grand", "great", "green", "happy", "heavy", "large", "light", "lucky",
  "quick", "quiet", "sharp", "shiny", "short", "small", "smart", "solid", "sweet", "thick",
  "tight", "tired", "tough", "warm", "young",

  // Technology terms
  "audio", "cache", "click", "cloud", "email", "frame", "image", "login", "media", "pixel",
  "power", "print", "pulse", "reset", "scale", "setup", "share", "sound", "steel", "trace",
  "video",
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