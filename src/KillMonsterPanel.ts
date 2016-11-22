class MonsterKilledPanel {
    panel: egret.DisplayObjectContainer;

    stage: egret.DisplayObjectContainer;

    private taskService: TaskService;
    private currentTaskId: string;
    private currentTaskStatus: number;
    
    private button: egret.DisplayObjectContainer;
    private buttonBack: egret.Shape;
    private buttonColor = 0xd6ecf0;
    private buttonX = 20;
    private buttonY = 600;
    private buttonWidth = 250;
    private buttonHeight = 50;

    private buttonTextField: egret.TextField;
    private buttonTextFieldText = " Kill a monster";
    private buttonTextFieldX = this.buttonX + 8;
    private buttonTextFieldY = this.buttonY + 5;
    private buttonTextFieldWidth = 230;
    private buttonTextFieldColor = 0x000000;

    public monsterValue = 0;


    public constructor(stage: egret.DisplayObjectContainer, taskService: TaskService) {
        this.stage = stage;
        this.taskService = taskService;
        this.taskService.Attach(this, "MonsterKilledPanel");
        this.panel = new egret.DisplayObjectContainer();
        this.button = new egret.DisplayObjectContainer();
        this.buttonBack = new egret.Shape();
        this.buttonTextField = new egret.TextField();
        this.stage.addChild(this.panel);
        this.drawPanel();
    }
    private drawButtonBack() {
        this.buttonBack.graphics.beginFill(this.buttonColor, 1);
        this.buttonBack.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
        this.buttonBack.graphics.endFill();

    }
    private setButtonText() {
        this.buttonTextField.fontFamily = "KaiTi";
        this.buttonTextField.text = this.buttonTextFieldText;
        this.buttonTextField.x = this.buttonTextFieldX;
        this.buttonTextField.y = this.buttonTextFieldY;
        this.buttonTextField.width = this.buttonTextFieldWidth;
        this.buttonTextField.bold = false;
        this.buttonTextField.textColor = this.buttonTextFieldColor;

    }
    private drawButton() {
        this.drawButtonBack();
        this.setButtonText();
        this.button.addChild(this.buttonBack);
        this.button.addChild(this.buttonTextField);
    }

    public drawPanel() {
        this.drawButton();
        this.panel.addChild(this.button);

        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

    }
    private onButtonClick(e: egret.TouchEvent) {
        switch (this.currentTaskStatus) {
            case TaskStatus.ACCEPTABLE:
                break;

            case TaskStatus.DURING:
                this.monsterValue++;
                console.log(this.monsterValue);
                if(this.monsterValue==10){
                    this.taskService.canFinish(this.currentTaskId);
                }
                break;


            case TaskStatus.CAN_SUBMIT:
                this.monsterValue = 0;
                break;

            default:

        }

    }
    public onChange(task: Task) {
        this.currentTaskId = task.id;
        this.currentTaskStatus = task.status;

    }
}