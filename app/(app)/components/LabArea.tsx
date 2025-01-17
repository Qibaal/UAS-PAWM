import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { reactions, reactionConstants, acids, bases } from "./chemistryData";
import { updateUserFields } from "@/utils/auth";


const VolumeControl = ({
    value,
    onChange,
}: {
    value: number;
    onChange: (value: number) => void;
}) => {
    return (
        <View style={styles.volumeControl}>
            <TouchableOpacity
                onPress={() => onChange(Math.max(1, value - 1))}
                style={styles.volumeButton}
            >
                <Ionicons name="chevron-back" size={24} color="#4A5568" />
            </TouchableOpacity>
            <Text style={styles.volumeText}>{value}</Text>
            <TouchableOpacity
                onPress={() => onChange(Math.min(10, value + 1))}
                style={styles.volumeButton}
            >
                <Ionicons name="chevron-forward" size={24} color="#4A5568" />
            </TouchableOpacity>
        </View>
    );
};

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
        <Text style={styles.chemicalName}>{chemical}</Text>
    </View>
);

const LabArea: React.FC<{ currentState: any }> = ({ currentState }) => {
    const [selectedAcid, setSelectedAcid] = useState<string | null>(null);
    const [selectedBase, setSelectedBase] = useState<string | null>(null);
    const [acidVolume, setAcidVolume] = useState<number>(1);
    const [baseVolume, setBaseVolume] = useState<number>(1);
    const [products, setProducts] = useState<{
        product1: string | null;
        product2: string | null;
    }>({ product1: null, product2: null });
    const [productVolumes, setProductVolumes] = useState<{
        vol1: number;
        vol2: number;
    }>({ vol1: 0, vol2: 0 });

    useEffect(() => {
        if (currentState) {
            setSelectedAcid(currentState.acid);
            setSelectedBase(currentState.base);
            setAcidVolume(currentState.acidMol);
            setBaseVolume(currentState.baseMol);   
        }
    }, [currentState])

    const calculateProducts = () => {
        if (selectedAcid && selectedBase) {
            const reactionKey = `${selectedAcid}+${selectedBase}`;
            const reaction = reactions[reactionKey];
            const constants = reactionConstants[reactionKey];

            if (reaction && constants) {
                const [prod1, prod2] = reaction.split(" + ");
                const [acidCoeff, baseCoeff, prod1Coeff, prod2Coeff] =
                    constants;

                const acidMoles = acidVolume / acidCoeff;
                const baseMoles = baseVolume / baseCoeff;
                const limitingMoles = Math.min(acidMoles, baseMoles);

                const product1Volume = limitingMoles * prod1Coeff;
                const product2Volume =
                    prod2 !== "-" ? limitingMoles * prod2Coeff : 0;

                setProducts({ product1: prod1, product2: prod2 });
                setProductVolumes({
                    vol1: parseFloat(product1Volume.toFixed(2)),
                    vol2: parseFloat(product2Volume.toFixed(2)),
                });
            }
        }
    };

    const checkReaction = () => {
        const reactionKey = `${selectedAcid}+${selectedBase}`;
        const reverseReactionKey = `${selectedBase}+${selectedAcid}`;
        const product = reactions[reactionKey] || reactions[reverseReactionKey];

        if (product) {
            const [product1, product2] = product.split(" + ");
            setProducts({
                product1,
                product2: product2 === "-" ? "" : product2,
            });
        }
    };

    const handleSaveState = async () => {
        if (selectedAcid && selectedBase && acidVolume && baseVolume) {
            try {
                const result = await updateUserFields({
                    state: {
                        acid: selectedAcid,
                        base: selectedBase,
                        acidMol: acidVolume,
                        baseMol: baseVolume,
                    },
                });

                if (result.success) {
                    console.log("State save success!");
                } else {
                    console.error("Failed to update user score:", result.error);
                }
            } catch (error) {
                console.error("Error while updating user score:", error);
            }
        }
        return;
    };

    useEffect(() => {
        if (selectedAcid && selectedBase) {
            checkReaction();
            calculateProducts();
        }
    }, [selectedAcid, selectedBase, acidVolume, baseVolume]);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Chemistry Lab</Text>

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
                    {products.product1 && (
                        <VolumeControl
                            value={acidVolume}
                            onChange={setAcidVolume}
                        />
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
                    {products.product1 && (
                        <VolumeControl
                            value={baseVolume}
                            onChange={setBaseVolume}
                        />
                    )}
                </View>

                {products.product1 && (
                    <Text style={styles.operatorText}>→</Text>
                )}

                {products.product1 && (
                    <View style={styles.productsContainer}>
                        <View style={styles.chemicalContainer}>
                            <ChemicalBeaker
                                chemical={products.product1}
                                color="#E9D8FD"
                            />
                            <Text style={styles.volumeText}>
                                {productVolumes.vol1} mol
                            </Text>
                        </View>
                        {products.product2 !== "-" && (
                            <>
                                <Text style={styles.operatorText}>+</Text>
                                <View style={styles.chemicalContainer}>
                                    <ChemicalBeaker
                                        chemical={products.product2 || ""}
                                        color="#B2F5EA"
                                    />
                                    <Text style={styles.volumeText}>
                                        {productVolumes.vol2} mol
                                    </Text>
                                </View>
                            </>
                        )}
                    </View>
                )}
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

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSaveState}
                    style={[styles.button, styles.blueButton]}
                >
                    <Text style={styles.buttonText}>Save State</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fefae0",
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 48,
        color: "#2D3748",
        flexShrink: 1, // Ensure title doesn't grow beyond its space
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
        gap: 16,
        marginVertical: 16,
    },
    chemicalButton: {
        width: "30%",
        marginBottom: 16,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 8,
    },
    blueButton: {
        backgroundColor: "#007BFF",
    },
    pinkButton: {
        backgroundColor: "#FF69B4",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default LabArea;
