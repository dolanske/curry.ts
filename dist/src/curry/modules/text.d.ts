import { Curry } from '..';
export type Text = (this: Curry, text: string | number, location?: 'prepend' | 'append') => Curry;
/**
 *
 * @param this Curry instance
 * @param text Text content to set to the element
 * @param location Where to place the text Leave empty if you want to replace the text
 * @returns Curry instance for optional chaining
 */
export declare const _text: Text;
//# sourceMappingURL=text.d.ts.map