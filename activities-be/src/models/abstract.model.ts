export abstract class AbstractModel {
  getValueOrNull(value: unknown) {
    return typeof value !== 'undefined' ? value : null;
  }

  throwIfUndefined<T>(value: T): T | never {
    if (typeof value === 'undefined') {
      throw new Error('Required value is missing');
    }
    return value;
  }
}
