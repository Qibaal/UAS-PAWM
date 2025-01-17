import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    Dimensions,
} from "react-native";
import { reactions, questions, acids, bases } from "./chemistryData";

import { updateUserFields } from "@/utils/auth";

import GameOverDialog from "./GameOverDialog";

const ChemicalBeaker = ({
    chemical,
    color,
}: {
    chemical: string;
    color: string;
}) => (
    <View
        style={[
            styles.chemicalBeaker,
            { backgroundColor: color, borderRadius: 8 },
        ]}
    >
        <Image
            source={require("../../../assets/images/startscreenlogo.png")}
            style={styles.beakerImage}
        />
        <Text style={styles.chemicalName}>{chemical || ""}</Text>
    </View>
);

const TestArea: React.FC<{ highestScore: number }> = ({ highestScore }) => {
    const [currentQuestion, setQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState([1, 1, 1]);
    const [selectedAcid, setSelectedAcid] = useState<string | null>(null);
    const [selectedBase, setSelectedBase] = useState<string | null>(null);

    const checkReaction = () => {
        const reactionKey = `${selectedAcid}+${selectedBase}`;
        const reverseReactionKey = `${selectedBase}+${selectedAcid}`;
        const product = reactions[reactionKey] || reactions[reverseReactionKey];

        if (product) {
            const [product1, product2] = product.split(" + ");

            const tempAnswer1 = questions[currentQuestion].split(" + ")[0];
            const tempAnswer2 = questions[currentQuestion].split(" + ")[1];

            console.log(product1, tempAnswer1);
            console.log(product2, tempAnswer2);

            if (tempAnswer1 === product1 && tempAnswer2 === product2) {
                console.log("jawaban benar");
                setTimeout(() => {
                    setSelectedAcid(null);
                    setSelectedBase(null);
                    setScore(score + 100);
                    setQuestion(currentQuestion + 1);
                }, 500);
            } else {
                console.log("jawaban SALAH");
                setTimeout(() => {
                    setSelectedAcid(null);
                    setSelectedBase(null);
                    setScore(score > 0 ? score - 50 : score);
                    setLives((prevLives) => {
                        const updatedLives = [...prevLives];
                        updatedLives.pop();
                        return updatedLives;
                    });
                }, 500);
            }
        }
    };

    useEffect(() => {
        checkReaction();
    }, [selectedAcid, selectedBase]);

    useEffect(() => {
        const handleUpdateUserScore = async () => {
            if (lives.length === 0) {
                if (score > highestScore) {
                    try {
                        const result = await updateUserFields({ score });
    
                        if (result.success) {
                            console.log("User score updated successfully!");
                        } else {
                            console.error(
                                "Failed to update user score:",
                                result.error
                            );
                        }
                    } catch (error) {
                        console.error("Error while updating user score:", error);
                    }
                }
            }
        };

        handleUpdateUserScore();
    }, [lives]);

    const handleRetry = () => {
        router.replace("/(app)/virtual-lab-test");
    };

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>
                        Quesion {currentQuestion + 1}
                    </Text>
                    <View style={styles.heartsContainer}>
                        {lives.length > 2 && (
                            <Image
                                source={require("../../../assets/images/virtual-lab/heart.png")}
                                style={styles.heartImage}
                            />
                        )}
                        {lives.length > 1 && (
                            <Image
                                source={require("../../../assets/images/virtual-lab/heart.png")}
                                style={styles.heartImage}
                            />
                        )}
                        {lives.length > 0 && (
                            <Image
                                source={require("../../../assets/images/virtual-lab/heart.png")}
                                style={styles.heartImage}
                            />
                        )}
                    </View>
                </View>

                <Text style={styles.currentScore}>Score: {score}</Text>

                <View style={styles.reactionArea}>
                    <View style={styles.chemicalContainer}>
                        {selectedAcid ? (
                            <ChemicalBeaker
                                chemical={selectedAcid}
                                color="#FED7E2"
                            />
                        ) : (
                            <View style={styles.emptyBeaker}>
                                <Text style={styles.emptyBeakerText}>
                                    Drop Acid
                                </Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.operatorText}>+</Text>
                    <View style={styles.chemicalContainer}>
                        {selectedBase ? (
                            <ChemicalBeaker
                                chemical={selectedBase}
                                color="#BEE3F8"
                            />
                        ) : (
                            <View style={styles.emptyBeaker}>
                                <Text style={styles.emptyBeakerText}>
                                    Drop Base
                                </Text>
                            </View>
                        )}
                    </View>

                    <Text style={styles.operatorText}>→</Text>

                    <View style={styles.productsContainer}>
                        <View style={styles.chemicalContainer}>
                            <ChemicalBeaker
                                chemical={
                                    questions[currentQuestion].split(" + ")[0]
                                }
                                color="#E9D8FD"
                            />
                        </View>
                        {questions[currentQuestion].split(" + ")[1] !== "-" && (
                            <>
                                <Text style={styles.operatorText}>+</Text>
                                <View style={styles.chemicalContainer}>
                                    <ChemicalBeaker
                                        chemical={
                                            questions[currentQuestion].split(
                                                " + "
                                            )[1]
                                        }
                                        color="#B2F5EA"
                                    />
                                </View>
                            </>
                        )}
                    </View>
                </View>

                <View style={styles.chemicalsGrid}>
                    <View style={styles.chemicalList}>
                        <Text style={styles.sectionTitle}>Acids</Text>
                        <View style={styles.chemicalGrid}>
                            {acids.map((acid) => (
                                <TouchableOpacity
                                    key={acid}
                                    onPress={() => setSelectedAcid(acid)}
                                    style={styles.chemicalContainer}
                                >
                                    <ChemicalBeaker
                                        chemical={acid}
                                        color="#FED7E2"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.chemicalList}>
                        <Text style={styles.sectionTitle}>Bases</Text>
                        <View style={styles.chemicalGrid}>
                            {bases.map((base) => (
                                <TouchableOpacity
                                    key={base}
                                    onPress={() => setSelectedBase(base)}
                                    style={styles.chemicalContainer}
                                >
                                    <ChemicalBeaker
                                        chemical={base}
                                        color="#BEE3F8"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            {lives.length === 0 && (
                <SafeAreaView style={styles.overlay}>
                    <GameOverDialog currentScore={150} onRetry={handleRetry} />
                </SafeAreaView>
            )}
        </>
    );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fefae0",
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    heartsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignSelf: "flex-start",
        marginTop: 0,
        maxWidth: 80, // Adjust the maximum width if necessary
        overflow: "hidden", // Prevent overflow
    },
    heartImage: {
        width: 24,
        height: 24,
        marginLeft: 4,
        flexShrink: 1, // Allow shrinking to fit
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#2D3748",
        flexShrink: 1, // Ensure title doesn't grow beyond its space
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "nowrap", // Ensure the row doesn't wrap
    },
    currentScore: {
        fontSize: 14, // Smaller size for the score
        fontWeight: "bold",
        color: "#4A5568",
        marginBottom: 16, // Add some spacing below the score
    },
    reactionArea: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: 30,
        paddingHorizontal: 0,
        width: "100%",
    },
    chemicalContainer: {
        width: 60,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 0,
        maxWidth: 60,
    },
    chemicalBeaker: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    beakerImage: {
        width: "80%", // Relative size to the parent
        height: "80%", // Maintain consistent scaling
        resizeMode: "contain", // Prevent distortion
    },

    beakerContent: {
        width: 56,
        height: 64,
        borderRadius: 8,
        position: "absolute",
        bottom: 20,
    },

    beakerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 8,
    },
    chemicalName: {
        fontSize: 13,
        fontWeight: "600",
        color: "#4A5568",
        textAlign: "center",
    },
    emptyBeaker: {
        width: 60,
        height: 80,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#CBD5E0",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyBeakerText: {
        fontSize: 12,
        color: "#A0AEC0",
        textAlign: "center",
    },
    volumeControl: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    volumeButton: {
        padding: 8,
    },
    volumeText: {
        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 8,
        color: "#2D3748",
    },
    operatorText: {
        fontSize: 24,
        fontWeight: "bold",
        marginHorizontal: 4,
        color: "#4A5568",
    },
    productsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    chemicalsGrid: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    chemicalList: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#2D3748",
        textAlign: "center",
    },
    chemicalGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        gap: 16, // Uniform spacing between items
        marginVertical: 16,
    },
    chemicalButton: {
        width: "30%",
        marginBottom: 16,
        alignItems: "center",
    },

    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Translucent dark background
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999, // Ensure it appears above other elements
    },
});

export default TestArea;
