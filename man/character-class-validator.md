## character class validator

Simple component that can be called during the processing of a keyboard event.
It will run `preventDefault` on the keyboard event if character being processed is not matched by the character class by which it is configured.
This will, effectively, prevent unaccepted characters from being input.

```javascript
const validator = createCharacterClassValidator().characterClass('a-z123')
input.on('keypress.valid-character', characterClassValidator)
```
