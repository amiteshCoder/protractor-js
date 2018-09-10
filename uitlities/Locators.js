let locators =function () {

    this.findById = function (Id) {
        return element(by.id(Id))
    };

    this.findByXpath = function (xpath) {
        return element(by.xpath(xpath))
    };

    this.findByXClassName = function (className) {
        return element(by.className(className))
    };

    this.findByButtonText = function (buttonText) {
        return element(by.buttonText(buttonText))
    };

    this.findByModel = function (modelName) {
        return element(by.model(modelName))
    };

    this.findByBinding = function (bindingName) {
        return element(by.binding(bindingName))
    };

    this.findByExactBinding = function (exactBinding) {
        return element(by.exactBinding(exactBinding))
    };

    this.findByRepeater = function (repeater) {
        return element(by.repeater(repeater))
    }

};

module.exports = new locators();