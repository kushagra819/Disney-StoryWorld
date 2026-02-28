import { useState, useRef, useEffect, forwardRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './StoriesSection.css';

/* ─── Story Data ─── */
const STORIES = [
    {
        id: 'frozen',
        banner: 'MAGIC CHRONICLES',
        headline: 'ICE QUEEN RISES!',
        subtitle: 'Eternal winter grips Arendelle as mysterious powers emerge',
        character: '❄️',
        accentColor: '#38bdf8',
        pages: [
            { headline: 'THE CORONATION', caption: 'A young queen ascends to the throne of Arendelle, carrying a secret that could destroy everything she loves. The kingdom celebrates, unaware of the storm brewing within their new ruler.' },
            { headline: 'POWERS REVEALED', caption: 'In a moment of fear, ice erupts from royal hands. The ballroom freezes. Guests gasp in terror. The queen flees into the night, leaving behind a kingdom plunged into eternal winter.' },
            { headline: 'THE JOURNEY NORTH', caption: 'A fearless princess sets out with an ice harvester, his reindeer, and a magical snowman to find her sister and bring back summer to a frozen land.' },
            { headline: 'LET IT GO', caption: 'High in the mountains, the queen builds a palace of ice and finally embraces who she truly is. But below, her kingdom still suffers under an endless winter.' },
            { headline: 'AN ACT OF TRUE LOVE', caption: 'When all seems lost and ice threatens to consume everything, a selfless act of love proves more powerful than any magic — thawing a frozen heart and an entire kingdom.' },
            { headline: 'KINGDOM RESTORED', caption: 'Summer returns to Arendelle. The sisters reunite, and the queen learns that love — not fear — is the key to controlling her extraordinary gift.' },
        ],
    },
    {
        id: 'lion-king',
        banner: 'PRIDE ROCK GAZETTE',
        headline: 'KING RETURNS!',
        subtitle: 'Rightful heir reclaims throne after years in exile',
        character: '🦁',
        accentColor: '#f59e0b',
        pages: [
            { headline: 'CIRCLE OF LIFE', caption: 'A young prince is born on Pride Rock, presented to the animals of the savanna as their future king. The entire kingdom bows before the newest member of the royal family.', image: '/assets/stories/lion king/6lL49SOgBtqiXMs7Y5HWBYH3X9Z.jpg' },
            { headline: 'THE ELEPHANT GRAVEYARD', caption: 'Curiosity leads the young prince beyond the borders of the kingdom, into danger. A hyena ambush nearly claims two young lives, saved only by a father\'s fierce protection.', image: '/assets/stories/lion king/download' },
            { headline: 'TRAGEDY IN THE GORGE', caption: 'A stampede of wildebeest thunders through the gorge. The king saves his son but pays the ultimate price. A treacherous uncle watches from the cliff above, his plan complete.', image: '/assets/stories/lion king/l-intro-1646767047.jpg' },
            { headline: 'HAKUNA MATATA', caption: 'Exiled and consumed by guilt, the prince finds unlikely friends in a carefree warthog and meerkat. He grows up far from home, trying to forget who he was meant to be.', image: '/assets/stories/lion king/6lL49SOgBtqiXMs7Y5HWBYH3X9Z.jpg' },
            { headline: 'REMEMBER WHO YOU ARE', caption: 'A ghostly figure appears in the stars — a father\'s voice calling through the night. "Remember who you are. You are my son, and the one true king." The exile ends tonight.', image: '/assets/stories/lion king/download' },
            { headline: 'THE BATTLE FOR PRIDE ROCK', caption: 'The rightful king returns to challenge his uncle\'s tyranny. In a blaze of lightning and fire, the truth is revealed, the usurper falls, and the Pride Lands are reborn under their true king.', image: '/assets/stories/lion king/l-intro-1646767047.jpg' },
        ],
    },
    {
        id: 'hercules',
        banner: 'OLYMPUS DAILY',
        headline: 'ZERO TO HERO!',
        subtitle: 'Mortal proves godly strength in legendary trials',
        character: '⚡',
        accentColor: '#a855f7',
        pages: [
            { headline: 'STOLEN FROM OLYMPUS', caption: 'The son of Zeus is stolen from Mount Olympus by minions of the underworld. A potion meant to make him mortal fails — he retains his divine strength but loses his place among the gods.', image: '/assets/stories/hercules/herclues and zeus.jpg' },
            { headline: 'A HERO IN TRAINING', caption: 'A washed-up satyr trainer named Phil reluctantly takes on the young demigod. Through grueling trials and impossible tasks, a clumsy boy transforms into a legendary warrior.', image: '/assets/stories/hercules/maxresdefault.jpg' },
            { headline: 'THE HYDRA FALLS', caption: 'In the arena of Thebes, a seemingly unstoppable Hydra rises — cut one head, two more grow back. But with godlike strength and mortal courage, the beast is defeated. A hero is born.', image: '/assets/stories/hercules/herclues and zeus.jpg' },
            { headline: 'DEAL WITH THE DEVIL', caption: 'Hades, Lord of the Dead, plots to overthrow Olympus. His secret weapon: a captivating spy named Megara. But when love enters the equation, even the best-laid plans of gods go awry.', image: '/assets/stories/hercules/maxresdefault.jpg' },
            { headline: 'SACRIFICE OF LOVE', caption: 'When Megara falls, Hercules trades his own immortality to save her soul from the River Styx. It is this selfless act — not strength — that proves his true heroism.', image: '/assets/stories/hercules/herclues and zeus.jpg' },
            { headline: 'A GOD AMONG MEN', caption: 'Offered a place among the gods on Olympus, Hercules makes the ultimate choice: to remain mortal, to stay with the one he loves. A true hero\'s strength lies in the heart.', image: '/assets/stories/hercules/maxresdefault.jpg' },
        ],
    },
    {
        id: 'rapunzel',
        banner: 'KINGDOM TIMES',
        headline: 'LOST PRINCESS FOUND!',
        subtitle: 'Royal daughter discovered after 18 years in hidden tower',
        character: '🏰',
        accentColor: '#ec4899',
        pages: [
            { headline: 'THE STOLEN PRINCESS', caption: 'A magic flower heals the queen and imbues her newborn daughter with its golden power. But a vain witch kidnaps the child, hiding her in a tower deep in the forest, raising her as her own.' },
            { headline: '18 YEARS IN THE TOWER', caption: 'The girl grows up behind locked doors, her 70 feet of magical golden hair the only connection to a world she has never known. Every year, she watches floating lights appear on her birthday.' },
            { headline: 'THE THIEF ARRIVES', caption: 'A charming rogue on the run stumbles upon the hidden tower. Armed with a frying pan and fearless determination, the tower girl strikes a deal: he will take her to see the floating lights.' },
            { headline: 'KINGDOM ADVENTURE', caption: 'The outside world is everything she dreamed and more — taverns full of dreamers, palace guards on the chase, and a chameleon companion who trusts no one.' },
            { headline: 'THE LANTERN CEREMONY', caption: 'On a boat, surrounded by a thousand floating lanterns, the lost princess finally sees the lights up close. In this magical moment, she begins to remember who she truly is.' },
            { headline: 'THE PRINCESS RETURNS', caption: 'The witch\'s deception is shattered. The princess confronts her captor. With a sacrifice of love and the last of her magic, the kingdom\'s lost daughter is finally brought home.' },
        ],
    },
];

/* ─── Single Newspaper Card ─── */
function NewspaperCard({ story, index, onClick }) {
    return (
        <motion.div
            className="np-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.5 }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            onClick={onClick}
            style={{ '--story-accent': story.accentColor }}
        >
            <div className="np-card__banner">{story.banner}</div>
            <div className="np-card__body">
                <div className="np-card__rule" />
                <h3 className="np-card__headline">{story.headline}</h3>
                <div className="np-card__rule" />
                <div className="np-card__character">{story.character}</div>
                <p className="np-card__subtitle">{story.subtitle}</p>
                <span className="np-card__read">READ STORY &gt;&gt;</span>
            </div>
            {/* Distressed edge overlay */}
            <div className="np-card__distress" />
        </motion.div>
    );
}

/* ─── Single Page (forwardRef for react-pageflip) ─── */
const NewspaperPage = forwardRef(({ page, pageNum, storyBanner, totalPages }, ref) => (
    <div className="np-page" ref={ref}>
        <div className="np-page__inner">
            <div className="np-page__banner">{storyBanner}</div>
            <div className="np-page__rule" />
            {page.image && (
                <div className="np-page__image-wrapper">
                    <img src={page.image} alt={page.headline} className="np-page__image" />
                </div>
            )}
            <h2 className="np-page__headline">{page.headline}</h2>
            <div className="np-page__rule" />
            <p className="np-page__caption">{page.caption}</p>
            <div className="np-page__footer">
                <span className="np-page__num">— PAGE {pageNum} —</span>
            </div>
        </div>
        {/* Paper texture overlay */}
        <div className="np-page__texture" />
    </div>
));
NewspaperPage.displayName = 'NewspaperPage';

/* ─── Full-Screen Newspaper Reader ─── */
function NewspaperReader({ story, onClose }) {
    const bookRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = story.pages.length;

    const handleFlip = useCallback((e) => {
        setCurrentPage(e.data);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') bookRef.current?.pageFlip()?.flipNext();
            if (e.key === 'ArrowLeft') bookRef.current?.pageFlip()?.flipPrev();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <motion.div
            className="np-reader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Dark overlay */}
            <div className="np-reader__overlay" onClick={onClose} />

            <div className="np-reader__container">
                {/* Close button */}
                <button className="np-reader__close" onClick={onClose} aria-label="Close">
                    <X size={24} />
                </button>

                {/* Page counter */}
                <div className="np-reader__counter">
                    Page {currentPage + 1} of {totalPages}
                </div>

                {/* Book */}
                <div className="np-reader__book">
                    <HTMLFlipBook
                        ref={bookRef}
                        width={420}
                        height={560}
                        size="stretch"
                        minWidth={280}
                        maxWidth={500}
                        minHeight={400}
                        maxHeight={650}
                        showCover={false}
                        mobileScrollSupport={false}
                        onFlip={handleFlip}
                        flippingTime={800}
                        usePortrait={true}
                        startPage={0}
                        drawShadow={true}
                        maxShadowOpacity={0.5}
                        className="np-flipbook"
                    >
                        {story.pages.map((page, i) => (
                            <NewspaperPage
                                key={i}
                                page={page}
                                pageNum={i + 1}
                                storyBanner={story.banner}
                                totalPages={totalPages}
                            />
                        ))}
                    </HTMLFlipBook>
                </div>

                {/* Navigation arrows */}
                <div className="np-reader__nav">
                    <button
                        className="np-reader__arrow"
                        onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
                        disabled={currentPage === 0}
                    >
                        <ChevronLeft size={22} /> PREV
                    </button>
                    <button
                        className="np-reader__arrow"
                        onClick={() => bookRef.current?.pageFlip()?.flipNext()}
                        disabled={currentPage >= totalPages - 1}
                    >
                        NEXT <ChevronRight size={22} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Main Stories Section ─── */
export default function StoriesSection() {
    const [activeStory, setActiveStory] = useState(null);

    return (
        <section className="newspaper-stories" id="stories">
            {/* Background texture */}
            <div className="newspaper-stories__bg" />

            <div className="newspaper-stories__container">
                {/* Section header */}
                <motion.div
                    className="newspaper-stories__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="newspaper-stories__header-banner">DISNEY DISPATCH</div>
                    <h2 className="newspaper-stories__title">EXTRA! EXTRA! READ ALL ABOUT IT!</h2>
                    <p className="newspaper-stories__subtitle">
                        The greatest stories ever told — now in print
                    </p>
                    <div className="newspaper-stories__header-rule" />
                </motion.div>

                {/* Story cards grid */}
                <div className="newspaper-stories__grid">
                    {STORIES.map((story, i) => (
                        <NewspaperCard
                            key={story.id}
                            story={story}
                            index={i}
                            onClick={() => setActiveStory(story)}
                        />
                    ))}
                </div>
            </div>

            {/* Full-screen reader modal */}
            <AnimatePresence>
                {activeStory && (
                    <NewspaperReader
                        story={activeStory}
                        onClose={() => setActiveStory(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
