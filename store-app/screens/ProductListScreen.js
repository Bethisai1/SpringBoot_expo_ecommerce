import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from "react-native";
import API from "../services/api";

export default function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products");
      const data = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.products)
          ? res.data.products
          : [];

      setProducts(data);
    } catch (err) {
      console.log("Product fetch error:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const productName = item?.itemName || item?.name || "Product";
    const price = item?.unitPrice ?? item?.price ?? 0;
    const imageUrl = item?.imageUrl || item?.image || "https://placehold.co/100x100/png";

    return (
      <View style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.name}>{productName}</Text>
        <Text style={styles.price}>₹ {price}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => (item?.itemId ?? item?.id ?? index).toString()}
      numColumns={2}
      renderItem={renderItem}
      ListEmptyComponent={<Text style={styles.empty}>No products available.</Text>}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  name: {
    marginTop: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    marginTop: 5,
    color: "green",
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
  },
});
