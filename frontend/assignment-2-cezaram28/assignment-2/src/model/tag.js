import { EventEmitter } from "events";

class Tag extends EventEmitter {
    constructor() {
        super();
        this.state = {
            tags: [{
                id: 0,
                name: "java"
            }, {
                id: 1,
                name: "programming"
            }],
            newTag: {
                id: "",
                name: ""
            },
            index: 2
        };
    }

    addTag(name) {
        let tag = {
            id: this.state.index,
            name
        }

        this.state = {
            ...this.state,
            tags: this.state.tags.concat([tag]),
            index: this.state.index + 1
        };
        this.emit("change", this.state);

        return tag;
    }

    toString(tags) {
        let s = "";
        tags.forEach(tag => s = s + tag.name + " ");
        return s;
    }

    found(tag) {
        for (let i = 0; i < this.state.tags.length; i++)
            if (this.state.tags[i].name === tag) return i;
        return -1;
    }

    toList(tags) {
        let tagNames = tags.split(",");
        let tagList = [];
        for (let i = 0; i < tagNames.length; i++) {
            let ind = this.found(tagNames[i]);
            ind === -1 ? tagList.push(this.addTag(tagNames[i])) : tagList.push(this.state.tags[ind]);
        }
        return tagList;
    }
}

const tag = new Tag();

export default tag;