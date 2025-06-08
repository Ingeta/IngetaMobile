export class PodItem {
    constructor(
        public title: string,
        public link: string,
        public pubDate: Date,
        public enclosureUrl: string,
        public imageUrl?: string,
        public content?: string
    ) {}
}
