{
    // 쿠키 만드는 기계
    // 클래스
    type Cookie = {
        dough: number;
        hasChoco: boolean;
    }
    
    class CookieMaker {
        private static FLOUR_PER_DOUGH: number = 10;
        private flour: number = 0;

        constructor(flour: number) {
            this.flour = flour;
        }

        makeCookie(dough: number): Cookie {
            if(this.flour < dough * CookieMaker.FLOUR_PER_DOUGH){
                throw new Error('Not enough Flour...');
            }
            return {
                dough,
                hasChoco: false
            }
        }
    }

    const maker = new CookieMaker(30);
    const cookie = maker.makeCookie(2);
    console.log(cookie);
    
}