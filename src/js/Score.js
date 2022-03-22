class Score {
    score = 0

    increase(score = 1) {
        this.score += score;
    }

    decrease(score = 1) {
        this.score -= score;
    }

    get get() {
        return this.score;
    }
}