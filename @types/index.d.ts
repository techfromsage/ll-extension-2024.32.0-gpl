declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.scss';
declare module '*.css';
declare module '*.webm';

/**
 * At time of writing Typescript (TS) does not handle [].filter(Boolean) well.
 *
 * Even though this is highly used in JS and is guaranteed to filter out falsy values (null, undefined, 0, '' etc...)
 * TS still complains that values could be undefined.
 *
 * Overriding the Array Filter function to tell TS that it will never return empty values fixes this.
 * This may change in future versions of Typescript.
 *
 * @see https://twitter.com/mattpocockuk/status/1560594658409029633 this tweet for original inspiration
 * @see TS issue to track progress: https://github.com/microsoft/TypeScript/issues/50387
 */
interface Array<T> {
  filter(predicate: BooleanConstructor): NonFalsy<T>[];
}

type NonFalsy<T> = T extends null | undefined | 0 | '' | false ? never : T;

/**
 * Allowing Partials for nested objects.
 *
 * @see https://grrr.tech/posts/2021/typescript-partial/
 */
type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object ? Subset<K[attr]> : K[attr];
};
