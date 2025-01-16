import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { reactions, acids, bases } from './chemistryData';

const ChemicalBeaker = ({ chemical, color }: { chemical: string; color: string }) => (
  <View style={[styles.chemicalBeaker, { backgroundColor: color, borderRadius: 8 }]}>
    <Image
      source={require("../../../assets/images/startscreenlogo.png")}
      style={styles.beakerImage}
    />
    <Text style={styles.chemicalName}>{chemical}</Text>
  </View>
);


const TestArea = () => {
  const [selectedAcid, setSelectedAcid] = useState<string | null>(null);
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [products, setProducts] = useState<{ product1: string | null; product2: string | null }>({ product1: null, product2: null });

  const checkReaction = () => {
    const reactionKey = `${selectedAcid}+${selectedBase}`;
    const reverseReactionKey = `${selectedBase}+${selectedAcid}`;
    const product = reactions[reactionKey] || reactions[reverseReactionKey];
    
    if (product) {
      const [product1, product2] = product.split(' + ');
      setProducts({ product1, product2: product2 === '-' ? '' : product2 });
    }
  };

  useEffect(() => {
      checkReaction();
  }, [selectedAcid, selectedBase]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Chemistry Lab</Text>

      <View style={styles.reactionArea}>
        <View style={styles.chemicalContainer}>
          {selectedAcid ? (
            <ChemicalBeaker chemical={selectedAcid} color="#FED7E2" />
          ) : (
            <View style={styles.emptyBeaker}>
              <Text style={styles.emptyBeakerText}>Drop Acid</Text>
            </View>
          )}
        </View>

        <Text style={styles.operatorText}>+</Text>

        <View style={styles.chemicalContainer}>
          {selectedBase ? (
            <ChemicalBeaker chemical={selectedBase} color="#BEE3F8" />
          ) : (
            <View style={styles.emptyBeaker}>
              <Text style={styles.emptyBeakerText}>Drop Base</Text>
            </View>
          )}
        </View>

        <Text style={styles.operatorText}>→</Text>

        {products.product1 && (
          <View style={styles.productsContainer}>
            <View style={styles.chemicalContainer}>  {/* This container style was missing */}
              <ChemicalBeaker chemical={products.product1} color="#E9D8FD" />
            </View>
            {products.product2 !== '-' && (
              <>
                <Text style={styles.operatorText}>+</Text>
                <View style={styles.chemicalContainer}>  {/* This container style was missing */}
                  <ChemicalBeaker chemical={products.product2 || ''} color="#B2F5EA" />
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
                <ChemicalBeaker chemical={acid} color="#FED7E2" />
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
                <ChemicalBeaker chemical={base} color="#BEE3F8" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2D3748',
  },
  reactionArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  chemicalContainer: {
    width: 100, // Fixed width for all items
    height: 140, // Fixed height for alignment
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  
  chemicalBeaker: {
    width: '100%', // Match the parent container width
    height: '100%', // Match the parent container height
    alignItems: 'center',
    justifyContent: 'center',
  },
  beakerImage: {
    width: '80%', // Relative size to the parent
    height: '80%', // Maintain consistent scaling
    resizeMode: 'contain', // Prevent distortion
  },
  
  beakerContent: {
    width: 56,
    height: 64,
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
  },
  beakerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  chemicalName: {
    marginTop: 8,
    fontSize: 14, // Adjust font size for better readability
    fontWeight: '500',
    color: '#4A5568',
    textAlign: 'center', // Align text properly
  },
  emptyBeaker: {
    width: 60,
    height: 80,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#CBD5E0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBeakerText: {
    fontSize: 12,
    color: '#A0AEC0',
    textAlign: 'center',
  },
  volumeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  volumeButton: {
    padding: 8,
  },
  volumeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: '#2D3748',
  },
  operatorText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    color: '#4A5568',
  },
  productsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chemicalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chemicalList: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2D3748',
  },
  chemicalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    gap: 16, // Uniform spacing between items
    marginVertical: 16,
  },
  chemicalButton: {
    width: '30%',
    marginBottom: 16,
    alignItems: 'center',
  },
});

export default TestArea;

