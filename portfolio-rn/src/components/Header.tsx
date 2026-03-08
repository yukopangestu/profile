import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

type Section = 'home' | 'skills' | 'about' | 'portfolio' | 'experience' | 'contact';

interface HeaderProps {
  onNavigate: (section: Section) => void;
}

const navItems: { label: string; section: Section }[] = [
  { label: 'Home', section: 'home' },
  { label: 'Skills', section: 'skills' },
  { label: 'About', section: 'about' },
  { label: 'Portfolio', section: 'portfolio' },
  { label: 'Experience', section: 'experience' },
  { label: 'Contact', section: 'contact' },
];

export default function Header({ onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (section: Section) => {
    setMenuOpen(false);
    onNavigate(section);
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.logo}>YP</Text>
        <TouchableOpacity onPress={() => setMenuOpen(true)} style={styles.menuButton}>
          <FontAwesome5 name="bars" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={menuOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuOpen(false)}>
          <View style={styles.menu}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuLogo}>YP</Text>
              <TouchableOpacity onPress={() => setMenuOpen(false)}>
                <FontAwesome5 name="times" size={20} color={Colors.white} />
              </TouchableOpacity>
            </View>
            {navItems.map(item => (
              <TouchableOpacity
                key={item.section}
                style={styles.menuItem}
                onPress={() => handleNav(item.section)}
              >
                <Text style={styles.menuItemText}>{item.label}</Text>
                <FontAwesome5 name="chevron-right" size={12} color="rgba(255,255,255,0.4)" />
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.darkBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logo: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 2,
  },
  menuButton: {
    padding: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  menu: {
    backgroundColor: Colors.darkBlue,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 48,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuLogo: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  menuItemText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
});
