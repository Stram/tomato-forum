abstract class BaseBuilder {

  abstract build(): string

  ensurePropertyExists(property: any, propertyName: string) {
    if (!property) {
      throw new Error(`Cannot build new create command without ${propertyName} property!`);
    }
  }
}

export default BaseBuilder
