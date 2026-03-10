export const astrologyWords = ["SATURN", "MOON", "SOLAR", "LUNAR", "ZODIAC", "ECLIPSE", "EQUINOX", "CONSTELLATION", "HOROSCOPE", "ARIES", "VENUS", "MERCURY", "CELESTIAL", "SOLSTICE", "ASTRAL", "AEON", "ZENITH", "ASPECT"];
export const divinationWords = ["TAROT", "ORACLE", "SCRY", "SEER", "AUGURY", "VISION", "SCRYING", "PALMISTRY", "NUMEROLOGY", "CLAIRVOYANCE", "CLAIRAUDIENCE", "BIBLIOMANCY", "DIVINATION", "PLANCHETTE", "PROPHECY", "OMEN", "DOWSING", "XYLOMANCY", "PYROMANCY"];
export const basicMagickWords = ["SPELL", "WAND", "RITUAL", "CIRCLE", "ALTAR", "INCENSE", "POTION", "CHARM", "AMULET", "MAGICK", "WITCH", "WIZARD", "MAGE", "ADEPT", "COVEN", "RITE", "SIGIL", "SYMBOL", "HALLOW", "BANE", "AURA", "PACT", "VOW", "HEX", "ANKH", "CULT", "FATE", "ICON", "SOUL", "VOID", "BLOOD", "BROOM", "CURSE", "DEITY", "EARTH", "ESBAT", "FOCUS", "KARMA", "MUDRA", "POWER", "RAVEN", "REALM", "RELIC", "SKULL", "STAFF", "TOTEM", "UMBRA", "VIGIL", "WICCA", "ABJURE", "ANOINT", "BOLINE", "CENSER", "CHAKRA", "DAGGER", "HOODOO", "KARMIC", "KISMET", "MANTRA", "MEDIUM", "MIRROR", "MYSTIC", "OCCULT", "ORISON", "PURIFY", "ROSARY", "SABBAT", "SACRED", "SCARAB", "SEANCE", "SHADOW", "SPHERE", "TABLET", "TEMPLE", "TRANCE", "UNBIND", "VANISH", "VOTIVE", "ALCHEMY", "BINDING", "BRAZIER", "CHALICE", "CHANNEL", "ELEMENT", "ESSENCE", "FORTUNE", "LEYLINE", "LITURGY", "MANDALA", "REBIRTH", "SANCTUM", "BLESSING", "EXORCISE", "OBLATION", "PENDULUM", "SACRIFICE", "VIBRATION"];
export const advancedMagickWords = ["CONJURE", "SUMMON", "EVOKE", "BANISH", "WARDING", "ELDRITCH", "ETHEREAL", "ARCANA", "ARCHON", "GNOSIS", "THEURGY", "INVOCATION", "INCANTATION", "ENCHANTMENT", "SORCERY", "NECROMANCY", "MALEDICTION", "ANATHEMA", "BALEFIRE", "BAPHOMET", "CEREMONY", "CONCLAVE", "CONJURER", "COVENANT", "MANIFEST", "PENTACLE", "ASCENSION", "BANISHING", "BLASPHEMY", "BRIMSTONE", "FORBIDDEN", "CONSECRATE", "UNDERWORLD", "BENEDICTION", "NECROMANCER", "COUNTERSPELL", "QUINTESSENCE", "METAMORPHOSIS", "INVOKE", "ENTITY", "SORCERER", "ARSGOETIA", "POSSESSION"];
export const alchemyWords = ["ALCHEMY", "TRANSMUTE", "TINCTURE", "ELIXIR", "QUICKSILVER", "SULFUR", "ANTIMONY", "CALCINE", "CRUCIBLE", "CAULDRON", "APOTHECARY", "GEMSTONE", "CRYSTAL", "AMETHYST", "OBSIDIAN", "ALKAHEST", "ALBEDO", "APOTHEOSIS", "QUINTESSENCE", "MERCURY", "FORMULA", "BASILISK", "CADUCEUS"];
export const ancientLoreWords = ["CODEX", "GRIMOIRE", "TABLET", "VELLUM", "HERMETIC", "PANTHEON", "MYSTERY", "SAGE", "ARCHIVE", "LABYRINTH", "LODESTONE", "OUROBOROS", "CADUCEUS", "HIEROPHANT", "MAGISTER", "SCEPTER", "GATEWAY", "AETHERIC", "HIEROGLYPH", "ENOCHIAN", "KABBALAH", "ANCESTRAL", "CATACOMBS"];
export const spiritWords = ["SPIRIT", "DEMON", "ANGEL", "SERAPH", "ARCHANGEL", "WRAITH", "PHANTOM", "GHOST", "LICH", "VAMPIRE", "DAEMON", "ENTITY", "FAMILIAR", "SERVITOR", "CAMBION", "GORGON", "BASILISK", "PHOENIX", "POLTERGEIST", "POSSESSION", "RESURRECTION", "APPARITION", "BELLADONNA", "SHADOW", "VORTEX", "WYRM", "ABYSS", "AZOTH", "BESOM", "CABAL", "DRUID", "NEXUS", "ENTITY", "GORGON", "SERPENT", "VAMPIRE", "BASILISK", "FAMILIAR", "SERVITOR"];
export const advancedBasicMagickWords = [];
export const sortedBases = [];
export const precomputedWords: Record<string, string[]> = {
  "SATURN": [
    "STAR",
    "RUST",
    "AUNT",
    "RUNS",
    "SATURN"
  ],
  "SOLAR": [
    "SOLO",
    "ORAL",
    "ALSO",
    "SOAR",
    "SOLAR"
  ],
  "LUNAR": [
    "LUNA",
    "NEAR",
    "REAL",
    "EARN",
    "LUNAR"
  ],
  "ZODIAC": [
    "ACID",
    "CODA",
    "DAIZ",
    "ZODIAC"
  ],
  "MOON": [
    "MOO",
    "NOM",
    "MOON"
  ],
  "ARIES": [
    "RISE",
    "SIRE",
    "EARS",
    "ERAS",
    "ARIES"
  ],
  "VENUS": [
    "SUN",
    "USE",
    "VUE",
    "VENUS"
  ],
  "FATE": [
    "FAE",
    "TEA",
    "FATE"
  ],
  "RUNE": [
    "URN",
    "RUE",
    "RUN",
    "RUNE"
  ],
  "WAND": [
    "DAWN",
    "AND",
    "WAN",
    "WAD",
    "WAND"
  ],
  "ADEPT": [
    "TEA",
    "APE",
    "EAT",
    "TAP",
    "ADEPT"
  ],
  "AZOTH": [
    "OATH",
    "HAT",
    "HOT",
    "AZOTH"
  ],
  "COVEN": [
    "CONE",
    "ONE",
    "EON",
    "COVEN"
  ],
  "CURSE": [
    "CURE",
    "USE",
    "SUE",
    "CUE",
    "CURSE"
  ],
  "DEITY": [
    "TIDE",
    "DIE",
    "YET",
    "DEITY"
  ],
  "DEMON": [
    "OMEN",
    "ONE",
    "MEN",
    "DEMON"
  ],
  "EARTH": [
    "TEA",
    "EARTH",
    "HEART"
  ],
  "ESBAT": [
    "TEA",
    "BAT",
    "SET",
    "EAT",
    "ESBAT"
  ],
  "KARMA": [
    "ARK",
    "MARK",
    "KARMA"
  ],
  "NEXUS": [
    "SUN",
    "USE",
    "NEXUS"
  ],
  "POWER": [
    "WOE",
    "OWE",
    "ROW",
    "POWER"
  ],
  "RUNIC": [
    "URN",
    "RUN",
    "RUNIC"
  ],
  "ABJURE": [
    "JAR",
    "ARE",
    "EAR",
    "ABJURE"
  ],
  "AETHER": [
    "TEA",
    "TREE",
    "EARTH",
    "HEART",
    "AETHER"
  ],
  "AMULET": [
    "TEA",
    "MET",
    "LET",
    "EAT",
    "AMULET"
  ],
  "ASPECT": [
    "TEA",
    "CAST",
    "PACT",
    "ASPECT"
  ],
  "ASTRAL": [
    "SALT",
    "STAR",
    "ALTAR",
    "ASTRAL"
  ],
  "BANISH": [
    "SIN",
    "BANISH"
  ],
  "BOLINE": [
    "OIL",
    "BONE",
    "BOLINE"
  ],
  "CENSER": [
    "SEER",
    "CENSER"
  ],
  "CHAKRA": [
    "ARK",
    "CHAKRA"
  ],
  "CIRCLE": [
    "RELIC",
    "CIRCLE",
    "CLERIC"
  ],
  "GNOSIS": [
    "SIN",
    "GNOSIS"
  ],
  "INVOKE": [
    "INK",
    "INVOKE"
  ],
  "KARMIC": [
    "ARK",
    "MARK",
    "KARMIC"
  ],
  "KISMET": [
    "MIST",
    "KISMET"
  ],
  "MANTRA": [
    "ATMAN",
    "MANTRA"
  ],
  "MYSTIC": [
    "MIST",
    "MYSTIC"
  ],
  "OCCULT": [
    "CULT",
    "OCCULT"
  ],
  "ORACLE": [
    "LORE",
    "CORAL",
    "ORACLE"
  ],
  "ORISON": [
    "SIN",
    "IRON",
    "ORISON"
  ],
  "SERAPH": [
    "PHASE",
    "SHAPE",
    "SERAPH"
  ],
  "SPHERE": [
    "SEER",
    "SPHERE"
  ],
  "SUMMON": [
    "SUN",
    "ONUS",
    "SUMMON"
  ],
  "TABLET": [
    "TEA",
    "TABLET"
  ],
  "TRANCE": [
    "TEA",
    "NECTAR",
    "TRANCE"
  ],
  "VANISH": [
    "SIN",
    "VANISH"
  ],
  "VISION": [
    "SIN",
    "VISION"
  ],
  "VORTEX": [
    "VEX",
    "VORTEX"
  ],
  "WRAITH": [
    "WRIT",
    "WRAITH"
  ],
  "ALCHEMY": [
    "CALM",
    "HEAL",
    "ALCHEMY"
  ],
  "ANGELIC": [
    "ANGEL",
    "ANGELIC"
  ],
  "CAMBION": [
    "ICON",
    "CAMBION"
  ],
  "CHALICE": [
    "HEAL",
    "LICH",
    "CHALICE"
  ],
  "CHANNEL": [
    "HEAL",
    "CHANNEL"
  ],
  "CONJURE": [
    "URN",
    "CONE",
    "CURE",
    "RUNE",
    "CRONE",
    "CONJURE"
  ],
  "CRYSTAL": [
    "CAST",
    "SALT",
    "SCRY",
    "STAR",
    "CRYSTAL"
  ],
  "DOWSING": [
    "SIN",
    "WIND",
    "DOWSING"
  ],
  "EQUINOX": [
    "NIX",
    "EQUINOX"
  ],
  "FORTUNE": [
    "URN",
    "RUNE",
    "FORTUNE"
  ],
  "GATEWAY": [
    "TEA",
    "YEW",
    "AGATE",
    "GATEWAY"
  ],
  "INCENSE": [
    "SIN",
    "INCENSE"
  ],
  "MERCURY": [
    "CURE",
    "MERCURY"
  ],
  "OBELISK": [
    "OIL",
    "SOIL",
    "OBELISK"
  ],
  "PHANTOM": [
    "OATH",
    "PATH",
    "PHANTOM"
  ],
  "PHOENIX": [
    "HEX",
    "NIX",
    "PHOENIX"
  ],
  "REBIRTH": [
    "HERB",
    "RITE",
    "REBIRTH"
  ],
  "SANCTUM": [
    "SUN",
    "CAST",
    "SANCTUM"
  ],
  "SCEPTER": [
    "SEER",
    "TREE",
    "CREST",
    "SCEPTER",
    "SPECTER"
  ],
  "SCRYING": [
    "SIN",
    "SCRY",
    "SCRYING"
  ],
  "SERPENT": [
    "SEER",
    "TREE",
    "SERPENT"
  ],
  "SORCERY": [
    "ROSE",
    "SCRY",
    "SORCERY"
  ],
  "VAMPIRE": [
    "RIME",
    "PRIME",
    "VAMPIRE"
  ],
  "WARDING": [
    "DAWN",
    "WAND",
    "WIND",
    "WARDING"
  ],
  "WARLOCK": [
    "ARK",
    "CLAW",
    "CROW",
    "CLOAK",
    "CORAL",
    "WARLOCK"
  ],
  "ABLUTION": [
    "OIL",
    "ABLUTION"
  ],
  "AETHERIC": [
    "TEA",
    "RITE",
    "TREE",
    "EARTH",
    "HEART",
    "AETHER",
    "AETHERIC"
  ],
  "ALKAHEST": [
    "TEA",
    "HEAL",
    "SALT",
    "SEAL",
    "ALKAHEST"
  ],
  "AMETHYST": [
    "TEA",
    "MYTH",
    "AMETHYST"
  ],
  "ANATHEMA": [
    "TEA",
    "ATMAN",
    "ATHAME",
    "ANATHEMA"
  ],
  "ANTIMONY": [
    "ANOINT",
    "ANTIMONY"
  ],
  "BALEFIRE": [
    "ELF",
    "FAE",
    "LEAF",
    "LIFE",
    "FABLE",
    "BELIEF",
    "BALEFIRE"
  ],
  "BAPHOMET": [
    "TEA",
    "OATH",
    "PATH",
    "POEM",
    "TOMB",
    "BAPHOMET"
  ],
  "BASILISK": [
    "BASIL",
    "BASILISK"
  ],
  "BLESSING": [
    "SIN",
    "BLESS",
    "BLESSING"
  ],
  "CAULDRON": [
    "URN",
    "COLD",
    "CORD",
    "CLOUD",
    "CORAL",
    "LUNAR",
    "CAULDRON"
  ],
  "CEREMONY": [
    "CONE",
    "OMEN",
    "CRONE",
    "CEREMONY"
  ],
  "CONCLAVE": [
    "AEON",
    "CAVE",
    "CONE",
    "LOVE",
    "COVEN",
    "CLOVEN",
    "CONCLAVE"
  ],
  "CONJURER": [
    "URN",
    "CONE",
    "CURE",
    "RUNE",
    "CRONE",
    "CONJURE",
    "CONJURER"
  ],
  "COVENANT": [
    "TEA",
    "AEON",
    "CAVE",
    "CONE",
    "COVEN",
    "COVENANT"
  ],
  "CRUCIBLE": [
    "CUBE",
    "CURE",
    "RULE",
    "RELIC",
    "CIRCLE",
    "CLERIC",
    "CRUCIBLE"
  ],
  "ELDRITCH": [
    "LICH",
    "RITE",
    "TIDE",
    "RELIC",
    "ELDRITCH"
  ],
  "ETHEREAL": [
    "TEA",
    "HEAL",
    "TREE",
    "EARTH",
    "HEART",
    "AETHER",
    "HEALER",
    "ETHEREAL"
  ],
  "EXORCISE": [
    "ROSE",
    "SEER",
    "EXORCISE"
  ],
  "GEMSTONE": [
    "OMEN",
    "GNOME",
    "STONE",
    "GEMSTONE"
  ],
  "GRIMOIRE": [
    "RIME",
    "GRIMOIRE"
  ],
  "HERMETIC": [
    "RIME",
    "RITE",
    "TREE",
    "CHIME",
    "HERMETIC"
  ],
  "INITIATE": [
    "TEA",
    "INITIATE"
  ],
  "MAGISTER": [
    "TEA",
    "MAGE",
    "MIST",
    "RIME",
    "RITE",
    "SAGE",
    "STAR",
    "ARIES",
    "MASTER",
    "MIRAGE",
    "MAGISTER"
  ],
  "MANIFEST": [
    "FAE",
    "SIN",
    "TEA",
    "FATE",
    "MIST",
    "MANIFEST"
  ],
  "OBLATION": [
    "OIL",
    "OBLATION"
  ],
  "OBSIDIAN": [
    "SIN",
    "OBSIDIAN"
  ],
  "PANTHEON": [
    "TEA",
    "AEON",
    "OATH",
    "PATH",
    "PANTHEON"
  ],
  "PENTACLE": [
    "TEA",
    "PACT",
    "PLANE",
    "PENTACLE"
  ],
  "PROPHECY": [
    "ECHO",
    "PYRE",
    "COPPER",
    "PROPHECY"
  ],
  "SERVITOR": [
    "RITE",
    "ROSE",
    "SERVITOR"
  ],
  "SOLSTICE": [
    "OIL",
    "COIL",
    "SOIL",
    "SOLSTICE"
  ],
  "SORCERER": [
    "ROSE",
    "SEER",
    "SORCERER"
  ],
  "TINCTURE": [
    "URN",
    "CURE",
    "RITE",
    "RUNE",
    "RUNIC",
    "TINCTURE"
  ],
  "ARCHANGEL": [
    "HAG",
    "CRAG",
    "HEAL",
    "ANGEL",
    "CHARGE",
    "ARCHANGEL"
  ],
  "ASCENSION": [
    "SIN",
    "AEON",
    "CONE",
    "ICON",
    "ASCENSION"
  ],
  "BANISHING": [
    "HAG",
    "SIN",
    "BANISH",
    "BANISHING"
  ],
  "BLASPHEMY": [
    "HEAL",
    "SEAL",
    "PHASE",
    "PSALM",
    "SHAPE",
    "SYLPH",
    "BLASPHEMY"
  ],
  "BRIMSTONE": [
    "SIN",
    "BONE",
    "IRON",
    "MIST",
    "OMEN",
    "RIME",
    "RITE",
    "ROBE",
    "ROSE",
    "TOMB",
    "BESOM",
    "SIREN",
    "STONE",
    "STORM",
    "BRIMSTONE"
  ],
  "CATACOMBS": [
    "CAST",
    "TOMB",
    "CATACOMBS"
  ],
  "CELESTIAL": [
    "TEA",
    "CALL",
    "CAST",
    "CELL",
    "SALT",
    "SEAL",
    "CELESTIAL"
  ],
  "FORBIDDEN": [
    "BONE",
    "IRON",
    "ROBE",
    "FORBIDDEN"
  ],
  "HOROSCOPE": [
    "ECHO",
    "ROSE",
    "CORPSE",
    "HOROSCOPE"
  ],
  "LABYRINTH": [
    "BINARY",
    "LABYRINTH"
  ],
  "LODESTONE": [
    "NODES",
    "STONE",
    "LODESTONE"
  ],
  "PALMISTRY": [
    "MIST",
    "SALT",
    "STAR",
    "PRISM",
    "PSALM",
    "PRIMAL",
    "PALMISTRY"
  ],
  "SACRIFICE": [
    "FAE",
    "ARIES",
    "SACRIFICE"
  ],
  "TRANSMUTE": [
    "SUN",
    "TEA",
    "URN",
    "RUNE",
    "STAR",
    "ATTUNE",
    "MASTER",
    "NATURE",
    "SATURN",
    "STATUE",
    "TRANSMUTE"
  ],
  "VIBRATION": [
    "IRON",
    "VIBRATION"
  ],
  "XYLOMANCY": [
    "CALM",
    "ONYX",
    "XYLOMANCY"
  ],
  "APOTHECARY": [
    "TEA",
    "ECHO",
    "OATH",
    "PACT",
    "PATH",
    "PYRE",
    "CRYPT",
    "EARTH",
    "HEART",
    "CHAPTER",
    "APOTHECARY"
  ],
  "APOTHEOSIS": [
    "TEA",
    "OATH",
    "PATH",
    "ASHES",
    "PHASE",
    "SHAPE",
    "APOTHEOSIS"
  ],
  "APPARITION": [
    "IRON",
    "TIARA",
    "PATRON",
    "APPARITION"
  ],
  "BELLADONNA": [
    "AEON",
    "BANE",
    "BONE",
    "ALBEDO",
    "BELLADONNA"
  ],
  "CONSECRATE": [
    "TEA",
    "AEON",
    "CAST",
    "CONE",
    "ROSE",
    "SEER",
    "STAR",
    "TREE",
    "CREST",
    "CRONE",
    "STONE",
    "CANCER",
    "CENSER",
    "NECTAR",
    "SEANCE",
    "TRANCE",
    "ANCESTOR",
    "CRESCENT",
    "CONSECRATE"
  ],
  "DIVINATION": [
    "VOID",
    "ANOINT",
    "DIVINATION"
  ],
  "HIEROPHANT": [
    "TEA",
    "AEON",
    "IRON",
    "OATH",
    "PATH",
    "RITE",
    "EARTH",
    "HEART",
    "THORN",
    "PATRON",
    "THRONE",
    "HIEROPHANT"
  ],
  "INVOCATION": [
    "ICON",
    "ANOINT",
    "INVOCATION"
  ],
  "NECROMANCY": [
    "AEON",
    "CONE",
    "OMEN",
    "CRONE",
    "CANCER",
    "NECROMANCY"
  ],
  "NUMEROLOGY": [
    "URN",
    "LORE",
    "MOON",
    "OMEN",
    "RULE",
    "RUNE",
    "GNOME",
    "NUMEROLOGY"
  ],
  "PLANCHETTE": [
    "TEA",
    "HEAL",
    "PACT",
    "PATH",
    "CHANT",
    "PLANE",
    "PENTACLE",
    "PLANCHETTE"
  ],
  "POSSESSION": [
    "SIN",
    "POSSESS",
    "POSSESSION"
  ],
  "PROTECTION": [
    "CONE",
    "ICON",
    "IRON",
    "RITE",
    "ROOT",
    "CRONE",
    "OPTIC",
    "POTION",
    "PROTECTION"
  ],
  "UNDERWORLD": [
    "URN",
    "WOE",
    "LORE",
    "RULE",
    "RUNE",
    "WORD",
    "WORLD",
    "WONDER",
    "UNDERWORLD"
  ],
  "BENEDICTION": [
    "BONE",
    "CONE",
    "ICON",
    "TIDE",
    "BENEDICTION"
  ],
  "BIBLIOMANCY": [
    "OIL",
    "CALM",
    "COIL",
    "ICON",
    "CYMBAL",
    "CAMBION",
    "BIBLIOMANCY"
  ],
  "ENCHANTRESS": [
    "TEA",
    "CAST",
    "SEER",
    "STAR",
    "TREE",
    "ASHES",
    "CHANT",
    "CREST",
    "EARTH",
    "HEART",
    "AETHER",
    "CENSER",
    "NECTAR",
    "SEANCE",
    "TRANCE",
    "ENCHANT",
    "ENCHANTRESS"
  ],
  "INCANTATION": [
    "ICON",
    "ANOINT",
    "INCANTATION"
  ],
  "MALEDICTION": [
    "OIL",
    "TEA",
    "AEON",
    "CALM",
    "COIL",
    "COLD",
    "CONE",
    "ICON",
    "OMEN",
    "TIDE",
    "COMET",
    "DEMON",
    "CANDLE",
    "MALICE",
    "MANTLE",
    "ACONITE",
    "CITADEL",
    "MALEDICTION"
  ],
  "NECROMANCER": [
    "AEON",
    "CONE",
    "OMEN",
    "ARMOR",
    "CRONE",
    "CANCER",
    "NECROMANCER"
  ],
  "POLTERGEIST": [
    "OIL",
    "LORE",
    "RITE",
    "ROSE",
    "SEER",
    "SOIL",
    "TREE",
    "REPEL",
    "PRIEST",
    "TRIPLE",
    "POLTERGEIST"
  ],
  "QUICKSILVER": [
    "CURE",
    "LUCK",
    "RULE",
    "CURSE",
    "RELIC",
    "QUIVER",
    "SILVER",
    "QUICKSILVER"
  ],
  "WIDDERSHINS": [
    "SIN",
    "WIND",
    "SIREN",
    "SHRINE",
    "WIDDERSHINS"
  ],
  "CLAIRVOYANCE": [
    "OIL",
    "AEON",
    "CAVE",
    "COIL",
    "CONE",
    "ICON",
    "IRON",
    "LORE",
    "LOVE",
    "VIAL",
    "CORAL",
    "COVEN",
    "CRONE",
    "CYCLE",
    "RAVEN",
    "RELIC",
    "VALOR",
    "VOICE",
    "CANCER",
    "CIRCLE",
    "CLERIC",
    "CLOVEN",
    "NOVICE",
    "ORACLE",
    "CALCINE",
    "CONCLAVE",
    "CLAIRVOYANCE"
  ],
  "COUNTERSPELL": [
    "CUP",
    "SUN",
    "URN",
    "CELL",
    "CONE",
    "CULT",
    "CURE",
    "LORE",
    "ONUS",
    "ROSE",
    "RULE",
    "RUNE",
    "SEER",
    "SOUL",
    "TREE",
    "CREST",
    "CRONE",
    "CURSE",
    "LOTUS",
    "PLUTO",
    "PULSE",
    "REPEL",
    "SPELL",
    "STONE",
    "CENSER",
    "CORPSE",
    "SCROLL",
    "SCEPTER",
    "SERPENT",
    "SPECTER",
    "COUNTERSPELL"
  ],
  "QUINTESSENCE": [
    "SIN",
    "SUN",
    "QUEST",
    "UNSEEN",
    "ESSENCE",
    "INCENSE",
    "QUINTESSENCE"
  ],
  "RESURRECTION": [
    "SIN",
    "SUN",
    "URN",
    "CONE",
    "CURE",
    "ICON",
    "IRON",
    "ONUS",
    "RITE",
    "ROSE",
    "RUNE",
    "SEER",
    "TREE",
    "CREST",
    "CRONE",
    "CURSE",
    "RUINS",
    "RUNIC",
    "SIREN",
    "STONE",
    "CENSER",
    "CURRENT",
    "RESTORE",
    "SORCERER",
    "RESURRECTION"
  ],
  "CLAIRAUDIENCE": [
    "URN",
    "AURA",
    "CURE",
    "RULE",
    "RUNE",
    "ELDER",
    "LUCID",
    "LUNAR",
    "RELIC",
    "RUNIC",
    "CANCER",
    "CANDLE",
    "CIRCLE",
    "CLERIC",
    "CRADLE",
    "CALCINE",
    "CARDINAL",
    "RADIANCE",
    "CLAIRAUDIENCE"
  ],
  "CONSTELLATION": [
    "OIL",
    "SIN",
    "TEA",
    "AEON",
    "CALL",
    "CAST",
    "CELL",
    "COIL",
    "CONE",
    "ICON",
    "SALT",
    "SEAL",
    "SOIL",
    "STONE",
    "ANOINT",
    "INTENT",
    "ACONITE",
    "ANCIENT",
    "CONSTELLATION"
  ],
  "METAMORPHOSIS": [
    "TEA",
    "MIST",
    "OATH",
    "PATH",
    "POEM",
    "RIME",
    "RITE",
    "ROOT",
    "ROSE",
    "STAR",
    "ARIES",
    "ASHES",
    "EARTH",
    "HEART",
    "PHASE",
    "PRIME",
    "PRISM",
    "SHAPE",
    "STORM",
    "MASTER",
    "PRIEST",
    "SERAPH",
    "PROMISE",
    "APOTHEOSIS",
    "METAMORPHOSIS"
  ]
};
