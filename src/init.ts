import { ColorIndex } from "@/classes/ColorIndex.localStorage";
import { Liker } from "@/classes/Liker.localStorage";
import { Locale } from "@/classes/Locale";
import { QuestionCounter } from "@/classes/QuestionCounter.localStorage";

export function initLanguage() {
  Locale.init();
}

export function initLocalStorage() {
  QuestionCounter.init();
  Liker.init();
  ColorIndex.init();
}
