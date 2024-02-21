{
    type CoffeeCup = {
        shots: number;
        hasMilk?: boolean;
        hasSugar?: boolean;
    };

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeeCup;
    }

    class CoffeeMachine implements CoffeeMaker {
        private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
        private coffeeBeans: number = 0; // instance (object) level

        constructor(coffeeBeans: number) {
            this.coffeeBeans = coffeeBeans;
        }

        static makeMachine(coffeeBeans: number): CoffeeMachine {
            return new CoffeeMachine(coffeeBeans);
        }

        fillCoffeeBeans(beans: number) {
            if (beans < 0) {
                throw new Error('value for beans should be greater than 0');
            }
            this.coffeeBeans += beans;
        }

        clean() {
            console.log('cleaning the machine...🧼');
        }

        private grindBeans(shots: number) {
            console.log(`grinding beans for ${shots}`);
            if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
                throw new Error('Not enough coffee beans!');
            }
            this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
        }

        private preheat(): void {
            console.log('heating up... 🔥');
        }

        private extract(shots: number): CoffeeCup {
            console.log(`Pulling ${shots} shots... ☕️`);
            return {
                shots,
                hasMilk: false,
            };
        }

        makeCoffee(shots: number): CoffeeCup {
            this.grindBeans(shots);
            this.preheat();
            return this.extract(shots);
        }
    }

    interface MilkFrother {
        makeMilk(cup: CoffeeCup): CoffeeCup;
    }

    interface SugarProvider { 
        addSugar(cup: CoffeeCup): CoffeeCup;
    }

    //싸구려 우유 거품기
    class CheapMilkSteamer implements MilkFrother{
        private steamMilk(): void {
            console.log('Steaming some milk ...');
            
        }
        makeMilk(cup: CoffeeCup): CoffeeCup {
            this.steamMilk();
            return {
                ...cup,
                hasMilk: true;
            }
        }
    }
    class FancyMilkSteamer implements MilkFrother{
        private steamMilk(): void {
            console.log('Fancy Steaming some milk ...');
            
        }
        makeMilk(cup: CoffeeCup): CoffeeCup {
            this.steamMilk();
            return {
                ...cup,
                hasMilk: true;
            }
        }
    }
    class ColdMilkSteamer implements MilkFrother{
        private steamMilk(): void {
            console.log('Cold Steaming some milk ...');
            
        }
        makeMilk(cup: CoffeeCup): CoffeeCup {
            this.steamMilk();
            return {
                ...cup,
                hasMilk: true;
            }
        }
    }

    //설탕 제조기
    class CandySugarMixer implements SugarProvider{
        private getSuger( ){
            console.log('Getting some sugar from jar ...');
            return true;
        }
        addSugar(cup: CoffeeCup) : CoffeeCup {
            const sugar = this.getSuger();
            return {
                ...cup,
                hasSugar: sugar,
            };
        }
    }
    class SugarMixer implements SugarProvider{
        private getSuger( ){
            console.log('Getting some sugar ...');
            return true;
        }
        addSugar(cup: CoffeeCup) : CoffeeCup {
            const sugar = this.getSuger();
            return {
                ...cup,
                hasSugar: sugar,
            };
        }
    }

    class CaffeLatteMachine extends CoffeeMachine {
        constructor(
            beans: number, 
            public readonly serialNumber: string, 
            private milkFrother: MilkFrother) {
            super(beans);
        }
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            return this.milkFrother.makeMilk(coffee);
        }
    }

    class SweetCoffeeMaker extends CoffeeMachine {
        constructor(private beans: number, private sugar: SugarProvider){
            super(beans);
        }
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            return this.sugar.addSugar(coffee);
        }
    }

    class SweetCaffeLatteMachine extends CoffeeMachine {
        constructor(
            private beans: number, 
            private milk: MilkFrother, 
            private sugar: SugarProvider){
                super(beans);
            }
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            return this.milk.makeMilk(this.sugar.addSugar(coffee));
        }
    }

    const cheapMilkMaker = new CheapMilkSteamer();
    const fancyMilkMaker = new FancyMilkSteamer();
    const candySuger = new CandySugarMixer()


    const sweetMachine = new SweetCoffeeMaker(12, candySuger);
    const latteMachine = new CaffeLatteMachine(12, 'SS', cheapMilkMaker);
    const sweetLatteMachine = new SweetCaffeLatteMachine(12, cheapMilkMaker, candySuger);
}
  