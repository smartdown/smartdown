/* eslint-disable */

'use strict';

var db = [];

// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1790_george_washington_n.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1791_george_washington_n.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1792_george_washington_n.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1793_george_washington_n.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1794_george_washington_n.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1795_george_washington_n.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1796_george_washington_n.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1797_john_adams_f.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1798_john_adams_f.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1799_john_adams_f.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1800_john_adams_f.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1801_thomas_jefferson_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1802_thomas_jefferson_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1803_thomas_jefferson_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1804_thomas_jefferson_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1805_thomas_jefferson_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1806_thomas_jefferson_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1807_thomas_jefferson_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1808_thomas_jefferson_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1809_james_maddison_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1810_james_maddison_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1811_james_maddison_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1812_james_maddison_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1813_james_maddison_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1814_james_maddison_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1815_james_maddison_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1816_james_maddison_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1817_james_monroe_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1818_james_monroe_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1819_james_monroe_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1820_james_monroe_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1821_james_monroe_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1822_james_monroe_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1823_james_monroe_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1824_james_monroe_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1825_john_quincy_adams_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1826_john_quincy_adams_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1827_john_quincy_adams_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1828_john_quincy_adams_dr.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1829_andrew_jackson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1830_andrew_jackson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1831_andrew_jackson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1832_andrew_jackson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1833_andrew_jackson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1834_andrew_jackson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1835_andrew_jackson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1836_andrew_jackson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1837_martin_van_buren_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1838_martin_van_buren_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1839_martin_van_buren_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1840_martin_van_buren_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1841_john_tyler_wd.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1842_john_tyler_wd.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1843_john_tyler_wd.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1844_john_tyler_wd.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1845_james_polk_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1846_james_polk_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1847_james_polk_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1848_james_polk_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1849_zachary_taylor_w.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1850_millard_fillmore_w.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1851_millard_fillmore_w.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1852_millard_fillmore_w.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1853_franklin_pierce_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1854_franklin_pierce_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1855_franklin_pierce_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1856_franklin_pierce_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1857_james_buchanan_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1858_james_buchanan_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1859_james_buchanan_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1860_james_buchanan_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1861_abraham_lincoln_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1862_abraham_lincoln_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1863_abraham_lincoln_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1864_abraham_lincoln_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1865_andrew_johnson_nu.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1866_andrew_johnson_nu.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1867_andrew_johnson_nu.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1868_andrew_johnson_nu.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1869_ulysses_s_grant_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1870_ulysses_s_grant_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1871_ulysses_s_grant_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1872_ulysses_s_grant_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1873_ulysses_s_grant_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1874_ulysses_s_grant_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1875_ulysses_s_grant_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1876_ulysses_s_grant_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1877_rutherford_b_hayes_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1878_rutherford_b_hayes_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1879_rutherford_b_hayes_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1880_rutherford_b_hayes_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1881_chester_a_arthur_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1882_chester_a_arthur_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1883_chester_a_arthur_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1884_chester_a_arthur_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1885_grover_cleveland_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1886_grover_cleveland_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1887_grover_cleveland_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1888_grover_cleveland_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1889_benjamin_harrison_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1890_benjamin_harrison_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1891_benjamin_harrison_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1892_benjamin_harrison_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1893_grover_cleveland_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1894_grover_cleveland_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1895_grover_cleveland_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1896_grover_cleveland_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1897_william_mc_kinley_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1898_william_mc_kinley_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1899_william_mc_kinley_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1900_william_mc_kinley_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1901_theodore_roosevelt_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1902_theodore_roosevelt_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1903_theodore_roosevelt_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1904_theodore_roosevelt_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1905_theodore_roosevelt_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1906_theodore_roosevelt_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1907_theodore_roosevelt_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1908_theodore_roosevelt_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1909_william_h_taft_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1910_william_h_taft_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1911_william_h_taft_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1912_william_h_taft_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1913_woodrow_wilson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1914_woodrow_wilson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1915_woodrow_wilson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1916_woodrow_wilson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1917_woodrow_wilson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1918_woodrow_wilson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1919_woodrow_wilson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1920_woodrow_wilson_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1921_warren_g_harding_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1922_warren_g_harding_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1923_calvin_coolidge_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1924_calvin_coolidge_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1925_calvin_coolidge_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1926_calvin_coolidge_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1927_calvin_coolidge_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1928_calvin_coolidge_r.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1929_herbert_hoover_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1930_herbert_hoover_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1931_herbert_hoover_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1932_herbert_hoover_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1934_franklin_d_roosevelt_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1935_franklin_d_roosevelt_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1936_franklin_d_roosevelt_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1937_franklin_d_roosevelt_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1938_franklin_d_roosevelt_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1939_franklin_d_roosevelt_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1940_franklin_d_roosevelt_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1941_franklin_d_roosevelt_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1942_franklin_d_roosevelt_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1943_franklin_d_roosevelt_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1944_franklin_d_roosevelt_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1945_franklin_d_roosevelt_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1946_harry_s_truman_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1947_harry_s_truman_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1948_harry_s_truman_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1949_harry_s_truman_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1950_harry_s_truman_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1951_harry_s_truman_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1952_harry_s_truman_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1953_dwight_d_eisenhower_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1953_harry_s_truman_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1954_dwight_d_eisenhower_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1955_dwight_d_eisenhower_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1956_dwight_d_eisenhower_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1957_dwight_d_eisenhower_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1958_dwight_d_eisenhower_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1959_dwight_d_eisenhower_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1960_dwight_d_eisenhower_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1961_dwight_d_eisenhower_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1961_john_f_kennedy_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1962_john_f_kennedy_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1963_john_f_kennedy_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1964_lyndon_b_johnson_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1965_lyndon_b_johnson_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1966_lyndon_b_johnson_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1967_lyndon_b_johnson_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1968_lyndon_b_johnson_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1969_lyndon_b_johnson_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1970_richard_nixon_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1971_richard_nixon_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1972_richard_nixon_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1973_richard_nixon_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1974_richard_nixon_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1975_gerald_r_ford_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1976_gerald_r_ford_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1977_gerald_r_ford_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1978_jimmy_carter_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1979_jimmy_carter_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1980_jimmy_carter_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1981_jimmy_carter_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1982_ronald_reagan_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1983_ronald_reagan_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1984_ronald_reagan_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1985_ronald_reagan_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1986_ronald_reagan_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1987_ronald_reagan_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1988_ronald_reagan_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1989_george_bush_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1990_george_bush_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1991_george_bush_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1992_george_bush_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1993_william_j_clinton_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1994_william_j_clinton_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1995_william_j_clinton_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1996_william_j_clinton_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1997_william_j_clinton_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1998_william_j_clinton_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/1999_william_j_clinton_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2000_william_j_clinton_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2001_george_w_bush_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2002_george_w_bush_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2003_george_w_bush_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2004_george_w_bush_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2005_george_w_bush_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2006_george_w_bush_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2007_george_w_bush_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2008_george_w_bush_r.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2009_barack_obama_d.json' ));
db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2010_barack_obama_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2011_barack_obama_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2012_barack_obama_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2013_barack_obama_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2014_barack_obama_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2015_barack_obama_d.json' ));
// db.push(require( '../node_modules/@stdlib/stdlib/lib/node_modules/@stdlib/datasets/sotu/data/2016_barack_obama_d.json' ));

module.exports = db;
