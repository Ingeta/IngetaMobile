export class PodItem {
    constructor(
        public guid: string,
        public title: string,
        public link: string,
        public pubDate: Date,
        public enclosureUrl: string,
        public imageUrl?: string,
        public content?: string
    ) {}
}
