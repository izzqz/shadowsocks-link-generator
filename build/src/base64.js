"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class base64 {
    static encode(string) {
        let base64String;

        if (!string) string = '';

        base64String = Buffer.from(string).toString('base64');

        return base64String;
    }
    static decode(base64String) {

        let clearString;

        if (!base64String) base64String = '';

        clearString = Buffer.from(base64String, 'base64').toString('utf8');
        return clearString;
    }
}
exports.default = base64;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Jhc2U2NC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQXFCLE1BQU07SUFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFjO1FBQ3hCLElBQUksWUFBWSxDQUFBO1FBRWhCLElBQUksQ0FBQyxNQUFNO1lBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUV4QixZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7UUFFckQsT0FBTyxZQUFZLENBQUE7SUFDdkIsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBb0I7UUFDOUIsSUFBSSxXQUFXLENBQUE7UUFFZixJQUFJLENBQUMsWUFBWTtZQUFFLFlBQVksR0FBRyxFQUFFLENBQUE7UUFFcEMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVsRSxPQUFPLFdBQVcsQ0FBQTtJQUN0QixDQUFDO0NBQ0o7QUFwQkQseUJBb0JDIn0=
